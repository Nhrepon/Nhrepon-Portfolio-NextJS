"use client"
import React from 'react';
import CategoryState from '@/state/categoryState';
import PickFile from '@/components/dashboard/media/pickFile';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/utility/Utility';

const AddNewCategory = () => {
    const {createCategory} = CategoryState();
    const router = useRouter();
    const [category, setCategory] = React.useState({
        name: '',
        slug: '',
        description: '',
        image: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createCategory(category);
        if(response.status === "success"){
            toast.success("Category created successfully");
            setCategory({
                name: '',
                slug: '',
                description: '',
                image: "",
            });
            router.push('/dashboard/category');
        }else{
            toast.error(response.message);
        }
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Add New Category</h1>
            </div>
            <div className="flex flex-col gap-4 my-8 w-full max-w-[600px] mx-auto">
            <input type="text" name="title" id="title" placeholder="Title" className="border-2 border-gray-300 rounded-md p-2" value={category.name} onChange={(e) => setCategory({...category, name: e.target.value})}/>
                
                
                <div className="flex items-center gap-2 text-xs text-gray-500"><i onClick={() => setCategory({ ...category, slug: generateSlug(category.name) })} className="bi bi-check-square cursor-pointer text-xl"></i>Use title as slug</div>
                <input type="text" name="slug" id="slug" placeholder="Slug" className="border-2 border-gray-300 rounded-md p-2" value={category.slug} onChange={(e) => setCategory({...category, slug: e.target.value})}/>
                
                <input type="text" name="description" id="description" placeholder="Description" className="border-2 border-gray-300 rounded-md p-2" value={category.description} onChange={(e) => setCategory({...category, description: e.target.value})}/>
                <div className="flex gap-2 w-full items-center">
                <input type="text" name="image" id="image" placeholder="Image URL" className="border-2 border-gray-300 rounded-md p-2" value={category.image} onChange={(e) => setCategory({...category, image: e.target.value})}/>
                <PickFile onFileSelect={(file) => setCategory({...category, image: file})}/>
                </div>
                <button onClick={handleSubmit} className="bg-green-700 hover:bg-green-800 cursor-pointer w-fit mx-auto text-white py-2 px-4 rounded">Save</button>
            </div>
        </div>
    )
};

export default AddNewCategory;