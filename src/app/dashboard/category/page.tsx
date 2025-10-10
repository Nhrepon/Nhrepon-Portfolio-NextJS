"use client";
import React, { useEffect, useState } from 'react'
import CategoryState from '@/state/categoryState';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { DeleteAlert, TimestampToDate } from '@/utility/Utility';
import Link from "next/link";
import {useRouter} from "next/navigation";
import Pagination from '@/components/dashboard/Pagination';

export default function Category() {
  const { categoryList, getCategories, deleteCategory, total, loaded} = CategoryState();
  const router = useRouter();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);


  useEffect(() => {
    (async () => {
      await getCategories(skip, limit);
    })()
  }, []);

  const onPageChange = async (page: number) => {
    const newSkip = (page - 1) * limit;
    setSkip(newSkip);
    await getCategories(newSkip, limit);
  };

  const handleEdit = (id:string) => {
    router.push(`/dashboard/category/update/${id}`);
  };

  const handleDelete = async (id:string) => {
    if(await DeleteAlert()){
      const response = await deleteCategory(id);
      if(response.status === "success"){
        toast.success("Delete item successfully");
      }else{
        toast.error("Delete item failed");
      }
      await getCategories(skip, limit);
    }else{
      toast.error("Delete item failed");
    }
  }

  return (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <Link href={"/dashboard/category/new"}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Add New Category
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
            {categoryList && categoryList.length > 0 ? categoryList.map((category: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td><Image src={category.image} alt={category.name} width={1200} height={1200}
                             className='w-20 aspect-16/9'/></td>
                  <td>{TimestampToDate(category.createdAt)}</td>
                  <td>{TimestampToDate(category.updatedAt)}</td>  
                  <td>
                    <div className="flex gap-2 justify-end">
                      <div onClick={() => handleEdit(category._id)}
                           className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded">
                        <i className="bi bi-pencil"></i>
                      </div>
                      <div onClick={() => handleDelete(category._id)}
                           className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded">
                        <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
            )): <tr className={"flex items-center justify-center text-3xl"}><td>No data found</td></tr>}
            </tbody>
          </table>
          <div>
            <Pagination total={total} loaded={loaded} limit={limit} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
  )
}
