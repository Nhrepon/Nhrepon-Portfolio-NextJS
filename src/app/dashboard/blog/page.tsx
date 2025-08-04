'use client';

import {DeleteAlert} from '@/utility/Utility';
import toast from 'react-hot-toast';
import {TimestampToDate} from '@/utility/Utility';
import Link from 'next/link';
import BlogState from '@/state/blogState';
import React, {useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

export default function Blog() {
    const router = useRouter();

    // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']


    const {blogList, fetchBlogs, deleteBlog} = BlogState();
    useEffect(() => {
        (async () => {
            await fetchBlogs();
        })()
    }, []);


    const handleEdit = (slug: string) => {
        toast.success("Edit item");
        router.push(`/dashboard/blog/update/${slug}`);
    };

    const handleDelete = async (id: string) => {
        if (await DeleteAlert()) {
            const result = await deleteBlog(id);
            if (result) {
                toast.success("Delete item successfully");
            } else {
                toast.error("Delete item failed");
            }
            await fetchBlogs();
        } else {
            toast.error("Delete item failed");
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Blog</h1>
                <Link href="/dashboard/blog/new"
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Add New Blog</Link>
            </div>
            <div className={"overflow-auto"}>
                <table className="w-full text-sm">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Tag</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blogList && blogList.length > 0 ? blogList.map((blog, i) => (
                        <tr key={blog._id}>
                            <td>{i + 1}</td>
                            <td>{blog.title}</td>
                            <td>{blog.slug || ""}</td>
                            <td><Image className='w-32 aspect-16/9' src={blog.image} alt={blog.title} width={200}
                                       height={160}/></td>
                            <td>{blog.category.map((category: any) => category.name).join(", ") || ""}</td>
                            <td>{blog.tag.map((tag: any) => tag.name).join(", ") || ""}</td>
                            <td>{blog.author[0].userName || ""}</td>
                            <td>{blog.status || ""}</td>
                            <td>{blog.views || 0}</td>
                            <td>{blog.likes || 0}</td>
                            <td>{TimestampToDate(blog.createdAt)}</td>
                            <td>{TimestampToDate(blog.updatedAt)}</td>
                            <td>
                                <div className="flex gap-2">
                                    <div onClick={() => handleEdit(blog.slug)}
                                         className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded">
                                        <i className="bi bi-pencil"></i>
                                    </div>
                                    <div onClick={() => handleDelete(blog._id)}
                                         className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded">
                                        <i className="bi bi-trash"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={12} className="text-center">No data found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        </div>
    );
} 