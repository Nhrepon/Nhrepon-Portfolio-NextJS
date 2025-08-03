'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TextEditor from '@/components/dashboard/textEditor/TextEditor';
import { useState, useEffect } from 'react';
import CategoryState from '@/state/categoryState';
import TagState from '@/state/tagState';
import { generateSlug } from '@/utility/Utility';
import PickFile from '@/components/dashboard/media/pickFile';
import Image from 'next/image';
import BlogState from '@/state/blogState';

export default function NewBlog() {
  const router = useRouter();
  const { categoryList, getCategories } = CategoryState();
  const { tagList, getTags } = TagState();
  const { createBlog } = BlogState();


    useEffect(() => {
    (async()=>{
      await getCategories();
      await getTags();
    })()
  }, []);



  interface BlogData {
    title: string;
    content: string;
    slug: string;
    categoryId: string[];
    tagId: string[];
    image: string;
  }

  const [blogData, setBlogData] = useState<BlogData>({
    title: '',
    content: '<p>start writing</p>',
    slug: '',
    categoryId: [],
    tagId: [],
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("blogData: " + JSON.stringify(blogData));
    if (blogData.title && blogData.content && blogData.slug && blogData.categoryId && blogData.tagId && blogData.image) {
      const data = await createBlog(blogData);
      if(data.status === "success"){
        toast.success("Blog added successfully");
        setBlogData({
          title: '',
          content: '<p>start writing</p>',
          slug: '',
          categoryId: [],
          tagId: [],
          image: '',
        });
        router.push('/dashboard/blog');
      }else{
        toast.error("Failed to add blog");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  }

  console.log("blogData: " + JSON.stringify(blogData));


  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    
    if (e.key === "Enter" && e.currentTarget.value != "" || e.key === "," && e.currentTarget.value != "") {
      e.preventDefault();
      const tagId = tagList.find((tag) => tag.name === e.currentTarget.value);
      setBlogData({ ...blogData, tagId: [ ...blogData.tagId, tagId._id]})
      e.currentTarget.value = "";
    }else if (e.key === "Enter" && e.currentTarget.value === "" || e.key === "," && e.currentTarget.value === "") {
      e.preventDefault();
      toast.error("Please input tag value.");
    }

    console.log(blogData.tagId);
  }
  const removeTags = (e: number)=>{
    setBlogData({ ...blogData, tagId: blogData.tagId.filter((item, i)=> i !== e)})
  }



  return (
    <div className="w-full mx-auto">
      <div className=''>
        <h1 className='text-2xl font-bold py-2'>New blog</h1>
        <hr className='mb-4 border-gray-300'/>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-2/3">
              <input type="text" name="title" placeholder="Title" className="w-full p-2 border border-gray-300 rounded" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} />
              <TextEditor value={blogData.content} onChange={(value)=>setBlogData({ ...blogData, content: value })}/>
            </div>
            <div className="flex flex-col gap-4 w-1/3">
              <input type="text" name="slug" placeholder="Slug" className="w-full p-2 border border-gray-300 rounded" value={blogData.slug} onChange={(e) => setBlogData({ ...blogData, slug: e.target.value})} />
              <div className="flex items-center gap-2 text-xs text-gray-500"><i onClick={() => setBlogData({ ...blogData, slug: generateSlug(blogData.title) })} className="bi bi-check-square cursor-pointer text-xl"></i>Use title as slug</div>

              <div>
                <label>Categories:</label>
                {/* <input type="text" name="category" placeholder="Category" className="w-full p-2 border border-gray-300 rounded" value={blogData.category} onChange={(e) => setBlogData({ ...blogData, category: e.target.value })} /> */}
                {/* onChange={(e) => setBlogData({ ...blogData, categoryId: Array.from(e.target.selectedOptions, option => option.value) })} */}
                <div className="flex flex-wrap gap-2">
                {
                  blogData.categoryId.map((category, i) => {
                    return (
                      <div key={i} className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2">{categoryList.find((item, index)=> index === i)?.name}
                      <i onClick={()=>setBlogData({ ...blogData, categoryId: blogData.categoryId.filter((item, index)=> index !== i) })} className="bi bi-x-circle-fill text-red-600"></i>
                      </div>
                    )
                  })
                }
              <select name="category" id="category" className="w-full p-2 border border-gray-300 rounded" 
              value={blogData.categoryId} 
              onChange={(e) => setBlogData({ ...blogData, categoryId: [...blogData.categoryId, e.target.value] })}>
                <option value="">Select Category</option>
                {
                  categoryList.map((category, i) => {
                    return (
                      <option key={i} value={category._id}>{category.name}</option>
                    )
                  })
                }
              </select>
                </div>
              </div>

              <div className="my-2">
                      <label>Tags:</label>
                      <div className="flex flex-wrap gap-2">
                        {
                            blogData.tagId != null && blogData.tagId.map((item, i)=>(
                                <div key={i} className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2">{tagList.find((tag) => tag._id === item)?.name}<i onClick={()=>removeTags(i)} className="bi bi-x-circle-fill text-red-600"></i></div>
                              ))
                          }
                          
                      <input list="tags" type="text" name="tag" placeholder="Tag" className="w-full p-2 border border-gray-300 rounded my-2" onKeyDown={addTags}/>
                      <datalist id="tags">
                        {
                          tagList.map((tag, i) => {
                            return (
                              <option key={i} value={tag.name}/>
                            )
                          })
                        }
                      </datalist>
                      </div>
                    </div>

              {/* <input type="file" name="image" placeholder="Image" className="w-full h-30 p-2 border border-gray-300 rounded flex items-center hover:cursor-pointer" value={blogData.image} onChange={handleFile} accept='image/*'/>
               */}

              <div className="flex flex-col gap-4">
                <label>Image URL:</label>
                <input type="text" name="image" placeholder="Image URL" className="w-full p-2 border border-gray-300 rounded" value={blogData.image} onChange={(e) => setBlogData({ ...blogData, image: e.target.value })} />
                {
                  blogData.image && <Image src={blogData.image} alt={blogData.title} title={blogData.title} width={1200} height={1200} className="w-full h-auto object-contain rounded-lg" loading="lazy" />
                }
                <PickFile onFileSelect={(file) => setBlogData({ ...blogData, image: file })}/> 
              </div>

              
            </div>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded hover:cursor-pointer w-2xs">Save</button>
        </form>
      </div>
    </div>
  );
} 