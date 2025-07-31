'use client';
import React, {ReactNode, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import skillState from "@/state/skillState";

export default function UpdateSkills() {
    const {fetchSkills} = skillState();
    const router = useRouter();
    const {id} = useParams();

    useEffect(() => {
        (async ()=>{
            const response = await fetch(`/api/skills?id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if(response.ok){
                const data = await response.json();
                setFormData(data);
            }
        })()
    }, []);

    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        image: "",
    });

    console.log(formData);
    const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/skills', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            toast.success("Skill updated successfully");
            await fetchSkills();
            router.push('/dashboard/skills');

        } else {
            toast.error("Failed to update skill");
        }
    };
  return (
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold py-4'>Update Skills</h1>
        </div>
          <div className='w-full md:w-1/2 mx-auto'>
              <h2>{id}</h2>
              <form onSubmit={updateItem} className="space-y-6 w-full p-4">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Skill Title
                      </label>
                      <input
                          type="text"
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={onChangeFormData}
                          required
                          autoComplete="title"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                  </div>

                  <div>
                      <label htmlFor="description"
                             className="block text-sm font-medium text-gray-700">
                          Description
                      </label>
                      <input
                          type="description"
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={onChangeFormData}
                          required
                          autoComplete="description"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                  </div>

                  <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                          Image
                      </label>
                      <input
                          type="text"
                          name="image"
                          id="image"
                          value={formData.image}
                          onChange={onChangeFormData}
                          required
                          autoComplete="image"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                  </div>

                  <div className="flex flex-col flex-wrap gap-4">
                      <button type="submit" className="py-2 px-4 rounded hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white">
                          Submit
                      </button>
                      <button type="button" className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white py-2 px-4 rounded" onClick={() => router.push('/dashboard/skills')}>Cancel</button>
                  </div>
              </form>
          </div>
      </div>
  );
}