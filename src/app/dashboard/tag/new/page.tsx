"use client";
import React from 'react';
import PickFile from '@/components/dashboard/media/pickFile';
import { generateSlug } from '@/utility/Utility';
import TagState from '@/state/tagState';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AddNewTag = () => {
    const {createTag} = TagState();
    const router = useRouter();
    const [tag, setTag] = React.useState({
        name: '',
        slug: '',
        description: '',
        image: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createTag(tag);
        if(response.status === "success"){
            toast.success("Tag created successfully");
            setTag({
                name: '',
                slug: '',
                description: '',
                image: "",
            });
            router.push('/dashboard/tag');
        }else{
            toast.error(response.message);
        }
    };  

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Add New Tag</h1>
            </div>
            <div className="flex flex-col gap-4 my-8 w-full max-w-[600px] mx-auto">
                <input type="text" name="title" id="title" placeholder="Title" className="border-2 border-gray-300 rounded-md p-2"
                value={tag.name} onChange={(e) => setTag({...tag, name: e.target.value})}/>
                <div className="flex items-center gap-2 text-xs text-gray-500"><i onClick={() => setTag({ ...tag, slug: generateSlug(tag.name) })} className="bi bi-check-square cursor-pointer text-xl"></i>Use title as slug</div>             
                <input type="text" name="slug" id="slug" placeholder="Slug" className="border-2 border-gray-300 rounded-md p-2"
                value={tag.slug} onChange={(e) => setTag({...tag, slug: e.target.value})}/>
                <input type="text" name="description" id="description" placeholder="Description" className="border-2 border-gray-300 rounded-md p-2"
                value={tag.description} onChange={(e) => setTag({...tag, description: e.target.value})}/>
                
                <div className="flex gap-2 w-full items-center justify-between">
                <input type="text" name="image" id="image" placeholder="Image URL" className="border-2 border-gray-300 rounded-md p-2 w-[80%]" 
                value={tag.image} onChange={(e) => setTag({...tag, image: e.target.value})}/>
                <PickFile onFileSelect={(file) => setTag({...tag, image: file})}/>
                </div>
                <button onClick={handleSubmit} className="bg-green-700 hover:bg-green-800 cursor-pointer w-fit mx-auto text-white py-2 px-4 rounded">Save</button>
            </div>
        </div>
    )
};

export default AddNewTag;