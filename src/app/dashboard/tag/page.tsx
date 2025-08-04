"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { DeleteAlert, TimestampToDate } from '@/utility/Utility';
import TagState from '@/state/tagState';
import Link from "next/link";
import {useRouter} from "next/navigation";
import Pagination from '@/components/dashboard/Pagination';

export default function Tags() {
    const { tagList, getTags, deleteTag, total, loaded } = TagState();
    const router = useRouter();
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    useEffect(() => {
      (async () => {
        await getTags(skip, limit);
      })()
    }, []);

    const onPageChange = async (page: number) => {
      const newSkip = (page - 1) * limit;
      setSkip(newSkip);
      await getTags(newSkip, limit);
    };

  
    const handleEdit = (id:string) => {
      router.push(`/dashboard/tag/update/${id}`);
    };
  
    const handleDelete = async (id:string) => {
      if(await DeleteAlert()){
        const result = await deleteTag(id);
        if(result){
          toast.success("Delete item successfully");
        }else{
          toast.error("Delete item failed");
        }
        await getTags(skip, limit);
      }else{
        toast.error("Delete item failed");
      }
    }
  return (
    <div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
            <Link href={"/dashboard/tag/new"}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Add New Tag
            </Link>
        </div>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tagList && tagList.length > 0 ? tagList.map((tag:any, index:number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tag.name}</td>
                      <td>{tag.slug}</td>
                      <td>{tag.description}</td>
                      <td><Image src={tag.image} alt={tag.name} width={100} height={100} className='w-20 aspect-16/9' /></td>
                      <td>{TimestampToDate(tag.createdAt)}</td>
                      <td>{TimestampToDate(tag.updatedAt)}</td>
                        <td>
                            <div className="flex gap-2 justify-end">
                                <div onClick={() => handleEdit(tag._id)}
                                     className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded">
                                    <i className="bi bi-pencil"></i>
                                </div>
                                <div onClick={() => handleDelete(tag._id)}
                                     className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded">
                                    <i className="bi bi-trash"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                  )):(<tr><td className='text-center text-xl' colSpan={6}>No tags found</td></tr>)}
                </tbody>
              </table>
              <div>
                <Pagination total={total} loaded={loaded} limit={limit} onPageChange={onPageChange} />
              </div>
            </div>
    </div>
  )
}
