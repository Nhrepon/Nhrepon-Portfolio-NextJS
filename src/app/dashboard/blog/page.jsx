'use client';

import { DeleteAlert } from '@/utility/Utility';
import toast from 'react-hot-toast';
import { TimestampToDate } from '@/utility/Utility';
import Link from 'next/link';
import BlogState from '@/state/blogState';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Blog() {
  
    // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']


    const {blogList, fetchBlogs, deleteBlog} = BlogState();
    useEffect(() => {
      (async () => {
        await fetchBlogs();
      })()
    }, []);



  const handleEdit = () => {
    toast.success("Edit item");
  };

  const handleDelete = async (id) => {
    if(await DeleteAlert()){
      const result = await deleteBlog(id);
      if(result){
        toast.success("Delete item successfully");
      }else{
        toast.error("Delete item failed");
      }
      await fetchBlogs();
    }else{
      toast.error("Delete item failed");
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className=''>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold py-4'>Blog</h1>
          <Link href="/dashboard/blog/new" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Add New Blog</Link>
        </div>
        <table>
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
            {blogList.map((blog, i) => (
            <tr key={blog._id}>
              <td>{i + 1}</td>
              <td>{blog.title}</td>
              <td>{blog.slug || ""}</td>
              <td><Image className='w-20 aspect-16/9' src={blog.image} alt={blog.title} width={200} height={160}/></td>
              <td>{blog.category.map((category) => category.name).join(", ") || ""}</td>
              <td>{blog.tag.map((tag) => tag.name).join(", ") || ""}</td>
              <td>{blog.author[0].userName || ""}</td>
              <td>{blog.status || ""}</td>
              <td>{blog.views || 0}</td>
              <td>{blog.likes || 0}</td>
              <td>{TimestampToDate(blog.createdAt)}</td>
              <td>{TimestampToDate(blog.updatedAt)}</td>              
              <td>
              <div className='flex gap-2 bg-gray-300 p-1 opacity-50 hover:opacity-100 rounded '>
                <i onClick={() => handleEdit(blog._id)} className='bi bi-pencil text-green-700 hover:cursor-pointer'></i>
                <i onClick={() => handleDelete(blog._id)} className='bi bi-trash text-red-600 hover:cursor-pointer' ></i>
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