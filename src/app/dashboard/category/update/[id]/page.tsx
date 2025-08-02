"use client";
import React from 'react';
import {useParams} from "next/navigation";

const UpdateCategory = () => {
    const categoryId = useParams();
    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Update Category</h1>
            </div>
            <div className="flex flex-col gap-4 my-8 w-full max-w-[600px] mx-auto">
                <p>Category ID: {categoryId.id}</p>
                <input type="text" name="title" id="title" placeholder="Title"
                       className="border-2 border-gray-300 rounded-md p-2"/>
                <input type="text" name="slug" id="slug" placeholder="Slug"
                       className="border-2 border-gray-300 rounded-md p-2"/>
                <input type="text" name="description" id="description" placeholder="Description"
                       className="border-2 border-gray-300 rounded-md p-2"/>
                <input type="text" name="image" id="image" placeholder="Image URL"
                       className="border-2 border-gray-300 rounded-md p-2"/>
                <button
                    className="bg-green-700 hover:bg-green-800 cursor-pointer w-fit mx-auto text-white py-2 px-4 rounded">Save
                </button>
            </div>
        </div>
    );
};

export default UpdateCategory;