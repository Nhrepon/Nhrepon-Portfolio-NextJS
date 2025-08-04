"use client";
import React, { useEffect } from 'react';
import {useParams} from "next/navigation";
import CategoryState from '@/state/categoryState';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PickFile from '@/components/dashboard/media/pickFile';

const UpdateCategory = () => {
    const router = useRouter();
    const {id}= useParams();
    const {fetchCategoryById, updateCategory} = CategoryState();
        const [category, setCategory] = React.useState({
            name: '',
            slug: '',
            description: '',
            image: "",
        });

    useEffect(() => {
        (async () => {
            const response =await fetchCategoryById(id);
            if(response.status === "success"){
                setCategory({
                    name: response.data.name,
                    slug: response.data.slug,
                    description: response.data.description,
                    image: response.data.image,
                });
            }
        })()

    }, [id]);

    const handleUpdateCategory = async (id: any, category: any) => {
        const response = await updateCategory(id, category);
        if(response.status === "success"){
            toast.success("Category updated successfully");
            setCategory({
                name: '',
                slug: '',
                description: '',
                image: "",
            });
            router.push('/dashboard/category');
        }else{
            toast.error("Category updated failed");
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Update Category</h1>
            </div>
            <div className="flex flex-col gap-4 my-8 w-full max-w-[600px] mx-auto">
                <p>Category ID: {id}</p>
                <input type="text" name="title" id="title" placeholder="Title"
                       className="border-2 border-gray-300 rounded-md p-2" 
                       value={category.name} onChange={(e) => setCategory({...category, name: e.target.value})}/>
                <input type="text" name="slug" id="slug" placeholder="Slug"
                       className="border-2 border-gray-300 rounded-md p-2" 
                       value={category.slug} onChange={(e) => setCategory({...category, slug: e.target.value})}/>
                <input type="text" name="description" id="description" placeholder="Description"
                       className="border-2 border-gray-300 rounded-md p-2" 
                       value={category.description} onChange={(e) => setCategory({...category, description: e.target.value})}/>
                <div className="flex gap-2 justify-between items-center w-full" >
                <input type="text" name="image" id="image" placeholder="Image URL"
                       className="border-2 border-gray-300 rounded-md p-2 w-[80%]"
                       value={category.image} onChange={(e) => setCategory({...category, image: e.target.value})}/>
                <PickFile onFileSelect={(file) => setCategory({...category, image: file})}/>
                </div>
                <button onClick={() => handleUpdateCategory(id, category)}
                    className="bg-green-700 hover:bg-green-800 cursor-pointer w-fit mx-auto text-white py-2 px-4 rounded">Save
                </button>
            </div>
        </div>
    );
};

export default UpdateCategory;