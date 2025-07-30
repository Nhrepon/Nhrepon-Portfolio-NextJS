'use client';
import React, { useEffect, useState } from 'react'
import FileUpload from '@/components/dashboard/media/FileUpload';
import FileState from '@/state/fileState';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { DeleteAlert } from '@/utility/Utility';
export default function MediaPage() {
    const { fileList, getFileList, deleteFile } = FileState();
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);


    useEffect(() => {
        (async () => await getFileList(skip, limit))();
    }, [fileList]);


    const deleteFileHandler = async (id: string) => {
        try {
            if (await DeleteAlert()) {
                await deleteFile(id);
                toast.success('File deleted successfully');
            }else{
                toast.error('Failed to delete file');
            }
            await getFileList(skip, limit);
        } catch (error) {
            toast.error('Failed to delete file');
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold'>Media</h1>
            <p className='text-sm text-gray-500'>Upload your media files here</p>
            <hr />
            <div className="flex gap-4">
                <div className="flex flex-col gap-4 w-1/3">
                    <FileUpload />
                </div>
                <div className="flex flex-col gap-4 w-2/3">
                    <h2 className='text-xl font-bold my-2'>Media List</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            fileList && fileList.map((item: any, i: number) => (
                                <div key={i} className="flex flex-col gap-2 relative">
                                    <Image src={item.url ?? '/image.svg'} alt={item.name} title={item.name} width={1200} height={1200} className='w-full h-auto object-contain rounded-lg' loading='lazy' />
                                    <div className="flex flex-col gap-2">
                                        <h3 className='text-xs truncate'>{item.name}</h3>
                                        <p className='text-xs w-fit'>Category: {item.category[0].name}</p>
                                    </div>
                                    <div onClick={() => deleteFileHandler(item._id)} className="p-1 rounded-full bg-gray-300 cursor-pointer shadow absolute top-0 right-0 text-red-600 hover:text-red-700 font-bold transition-all"><i className="bi bi-x-circle-fill"></i></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
