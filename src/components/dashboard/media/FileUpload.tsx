import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import "./style.css";
import CategoryState from '@/state/categoryState';
import FileState from '@/state/fileState';

export default function FileUpload() {
    const [file, setFile] = useState<File[]>([]);
    const {categoryList, getCategories} = CategoryState();
    const [categoryId, setCategoryId] = useState<string>("");
    const {getFileList} = FileState();

    useEffect(() => {
        (
            async () => {
                if(categoryList.length === 0){
                    await getCategories(0, 1000);
                }
            }
        )();
    }, []);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files));
        }
    }

    const uploadFile = async () => {
        
        if(file?.length > 0){
            const formData = new FormData();
            formData.append('file', file?.[0]);
            formData.append('categoryId', categoryId);
            formData.append('name', file?.[0].name);
            const response = await fetch('/api/file', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.status === 'success') {
                toast.success(data.message);
                setFile([]);
                setCategoryId("");
                (async () => await getFileList(0, 10))();
            } else {
                toast.error(data.message);
            }
        }else{
            toast.error("Please select a file");
        }
    }


    return (
        <div>

            <div className="flex flex-col gap-4 items-center w-full bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-row gap-2 w-full items-center">
                    <label>Category:</label>
                    <select className='rounded border border-gray-300 outline-none py-1 px-2 cursor-pointer' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option className='rounded border border-gray-300 outline-none py-1 px-2' value="">Select Category</option>
                        {
                            categoryList.map((category: any, i: number) => {
                                return (
                                    <option className='rounded border border-gray-300 outline-none py-1 px-2' key={i} value={category._id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                
                <div className="w-full min-h-[200px] file-upload flex flex-col items-center justify-center rounded-lg">
                    <label>Select Media File</label>
                    <input id={"file"} onChange={handleFile} type="file" accept="image/*" className="w-full my-2" />
                    <p>Select an image</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                {
                    file.map((item: File, i: number) => {
                        return (
                            <div key={i} className="relative rounded-lg overflow-hidden">
                                <img src={URL.createObjectURL(item)} alt={""} className="w-full h-auto object-cover" />
                                <i onClick={() => setFile(file.filter((item: File, j: number) => j !== i))} className="bi bi-x-circle-fill text-red-600 cursor-pointer absolute top-0 right-0"></i>
                            </div>
                        )
                    })
                }
                </div>
                <button onClick={uploadFile} type="submit" className="bg-green-600 hover:bg-green-700 text-white cursor-pointer py-2 px-4 rounded">upload</button>
            </div>
        </div>
    )
}
