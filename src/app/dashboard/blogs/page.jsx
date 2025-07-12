'use client';

import { DeleteAlert } from '@/utility/Utility';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {blogList} from '@/db/data';
import { TimestampToDate } from '@/utility/Utility';

export default function Profile() {
  

    // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']


  const handleSave = () => {
    toast.success("Edit item");
  };
  const handleDelete = async (id) => {
    if(await DeleteAlert()){
      toast.error(`Delete item successfully ${id}`);
    }else{
      toast.error("Delete item failed");
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className=''>
        <h1 className='text-2xl font-bold py-4'>Skills</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Image</th>
              <th>Category</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Author</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>
                <img className='w-20 aspect-16/9' src={blog.img} alt={blog.title}/>
              </td>
              <td>{blog.category}</td>
              <td>{blog.views}</td>
              <td>{blog.comments}</td>
              <td>{blog.author}</td>
              <td>{TimestampToDate(blog.createdAt)}</td>
              <td>{TimestampToDate(blog.updatedAt)}</td>              
              <td>
              <div className='flex gap-2 bg-gray-300 p-1 opacity-50 hover:opacity-100 rounded '>
                <i className='bi bi-pencil text-green-700 hover:cursor-pointer'></i>
                <i className='bi bi-trash text-red-600 hover:cursor-pointer' ></i>
              </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 