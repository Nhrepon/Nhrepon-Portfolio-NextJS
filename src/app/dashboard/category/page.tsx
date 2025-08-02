
"use client";
import React, { useEffect } from 'react'
import CategoryState from '@/state/categoryState';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { DeleteAlert } from '@/utility/Utility';
import Link from "next/link";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Category() {
  const { categoryList, getCategories, deleteCategory } = CategoryState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await getCategories();
    })()
  }, []);

  const handleEdit = (id:string) => {
    router.push(`/dashboard/category/update/${id}`);
  };

  const handleDelete = async (id:string) => {
    if(await DeleteAlert()){
      const result = await deleteCategory(id);
      if(result){
        toast.success("Delete item successfully");
      }else{
        toast.error("Delete item failed");
      }
      await getCategories();
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
                  <td><Image src={category.image} alt={category.name} width={100} height={100}
                             className='w-20 aspect-16/9'/></td>
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
            )): <tr><td className={"text-center text-xl"} colSpan={6}>No data found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
  )
}
