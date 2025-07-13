'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TextEditor from '@/components/dashboard/textEditor/TextEditor';
import { useState } from 'react';


export default function Profile() {
  const router = useRouter();
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    slug: '',
    category: '',
    tag: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(blogData.title && blogData.content && blogData.slug && blogData.category && blogData.tag && blogData.image){
      setBlogData({
        title: '',
        content: '',
        slug: '',
        category: '',
        tag: '',
        image: '',
      });
      router.push('/dashboard/blogs');
      toast.success("Blog added successfully");
      console.log(blogData);
    }else{
      toast.error("Please fill all the fields");
    }
  }




  return (
    <div className="w-full mx-auto">
      <div className=''>
        <h1 className='text-2xl font-bold py-4'>New blog</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-2/3">
              <input type="text" name="title" placeholder="Title" className="w-full p-2 border border-gray-300 rounded" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})}/>
              <TextEditor />
            </div>
            <div className="flex flex-col gap-4 w-1/3">
              <input type="text" name="slug" placeholder="Slug" className="w-full p-2 border border-gray-300 rounded" value={blogData.slug} onChange={(e) => setBlogData({...blogData, slug: e.target.value})}/>
              <input type="text" name="category" placeholder="Category" className="w-full p-2 border border-gray-300 rounded" value={blogData.category} onChange={(e) => setBlogData({...blogData, category: e.target.value})}/>
              <input type="text" name="tag" placeholder="Tag" className="w-full p-2 border border-gray-300 rounded" value={blogData.tag} onChange={(e) => setBlogData({...blogData, tag: e.target.value})}/>
              <input type="file" name="image" placeholder="Image" className="w-full p-2 border border-gray-300 rounded" value={blogData.image} onChange={(e) => setBlogData({...blogData, image: e.target.files[0]})} accept='image/*'/>
              {
                blogData.image && (
                  <img src={URL.createObjectURL(blogData.image)} alt={blogData.title} className="w-full h-96 object-cover" />
                )
              }
            </div>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded hover:cursor-pointer w-2xs">Save</button>
        </form>
      </div>
    </div>
  );
} 