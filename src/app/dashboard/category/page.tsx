
"use client";
import React, { useEffect } from 'react'
import CategoryState from '@/state/categoryState';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { DeleteAlert } from '@/utility/Utility';

export default function Category() {
  const { categoryList, getCategories, deleteCategory } = CategoryState();
  useEffect(() => {
    (async () => {
      await getCategories();
    })()
  }, [categoryList]);

  const handleEdit = (id:string) => {
    toast.success("Edit item");
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
        <h2>Category</h2>
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
              {categoryList.map((category:any, index:number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td><Image src={category.image} alt={category.name} width={100} height={100} className='w-20 aspect-16/9' /></td>
                  <td>
                  <div className='flex gap-2 rounded justify-end'>
                    <span onClick={() => handleEdit(category._id)} className='text-green-700 cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded'>
                    <i className='bi bi-pencil'></i>
                    </span>
                    <span onClick={() => handleDelete(category._id)} className='text-red-600 cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded'>
                    <i className='bi bi-trash'></i>
                    </span>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}
