import { NextRequest, NextResponse } from 'next/server';
import FileModel from '@/models/fileModel';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { connect } from '@/db/dbConfig';
import CategoryModel from '@/models/categoryModel';
import sharp from 'sharp';
import { generateSlug } from '@/utility/Utility';

export async function POST(request: Request) {
    try {
        const userId = JSON.parse((await cookies()).get("userData")?.value || "").id;
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const categoryId = formData.get('categoryId') as string;
        const name = path.basename(formData.get('name') as string, path.extname(formData.get('name') as string));

        // Validate required fields
        if (!file || !categoryId || !name) {
            return NextResponse.json(
                { status: "error", message: 'Missing required fields: file, categoryId, and name are required' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { status: "error", message: 'Invalid file type. Allowed types: JPEG, PNG, GIF, PDF' },
                { status: 400 }
            );
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { status: "error", message: 'File size too large. Maximum allowed size is 5MB' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connect();

        // Validate category exists
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return NextResponse.json(
                { status: "error", message: 'Invalid category ID' },
                { status: 400 }
            );
        }

        // Create a unique filename
        let fileName = `${category.name}-${Date.now()}-${Math.floor(Math.random() * 1000)}-${name}`;
        let filePath: string;
        
        // Save file to root-level uploads folder
        const uploadPath = path.join(process.cwd(), 'public','uploads');
        if (!fs.existsSync(uploadPath)) {
            try {
                fs.mkdirSync(uploadPath, { recursive: true });
            } catch (error) {
                console.error('Error creating uploads directory:', error);
                return NextResponse.json(
                    { status: "error", message: 'Failed to create uploads directory' },
                    { status: 500 }
                );
            }
        }
        
        filePath = path.join(uploadPath, generateSlug(fileName));
        
        try {
            // Read file data
            const buffer = await file.arrayBuffer();
            const arrayBuffer = Buffer.from(buffer);


            // Convert to WebP if it's an image
            if (file.type.startsWith('image/')) {
                const webpData = await sharp(arrayBuffer)
                    .webp({quality: 90})
                    .toBuffer();
                
                // Update file name to include .webp extension
                const webpFileName = `${path.basename( generateSlug(fileName), path.extname(fileName))}.webp`;
                const webpFilePath = path.join(uploadPath, webpFileName);
                
                // Write WebP file
                await fs.promises.writeFile(webpFilePath, webpData);
                
                // Update file path and name for database
                filePath = webpFilePath;
                fileName = webpFileName;
            } else {
                // Write non-image file as is
                await fs.promises.writeFile(filePath, arrayBuffer);
            }
        } catch (error) {
            console.error('Error saving file:', error);
            return NextResponse.json(
                { status: "error", message: 'Failed to save file' },
                { status: 500 }
            );
        }

        // Save metadata to database
        const fileMetadata = new FileModel({
            userId: userId,
            categoryId: categoryId,
            name: name,
            url: `/uploads/${fileName}`
        });

        await fileMetadata.save();

        return NextResponse.json({
            status: "success",
            message: "File uploaded successfully",
            data: {
                id: fileMetadata._id,
                name: fileMetadata.name,
                url: fileMetadata.url
            }
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { status: "error", message: 'Failed to upload file' },
            { status: 500 }
        );
    }
}




export async function GET(request: NextRequest) {
    const skip = Number(request.nextUrl.searchParams.get("skip")) || 0;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
    try {
        const files = await FileModel.aggregate([
            {
                $facet: {
                    totalCount: [ { $count: "total" } ],
                    data: [
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "categoryId",
                                foreignField: "_id",
                                as: "category"
                            }
                        },
                        {
                            $sort: { updatedAt: -1 }
                        }
                    ],
                }
            }
        ]);
        return NextResponse.json({
            status: "success",
            message: "Files fetched successfully",
            totalFile: files[0].totalCount[0].total,
            loaded: files[0].data.length,
            data: files[0].data,
            
        });
    } catch (error) {
        return NextResponse.json(
            { status: "error", message: 'Failed to fetch files' },
            { status: 500 }
        );
    }
}




export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    try {
        const file = await FileModel.findById(id);
        if (!file) {
            return NextResponse.json(
                { status: "error", message: 'File not found' },
                { status: 404 }
            );
        }
        const filePath = path.join( process.cwd(), 'public', file.url);
        fs.unlinkSync(filePath);
        //console.log("\n\nDelete file: "+filePath+"\n\n");

        await FileModel.findByIdAndDelete(id);
        return NextResponse.json({
            status: "success",
            message: "File deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { status: "error", message: 'Failed to delete file' },
            { status: 500 }
        );
    }
}
