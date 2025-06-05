'use client';

import { DeleteAlert } from '@/utility/Utility';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  
  const [skills, setSkills] = useState(
    [
      {
      "id":1,
      "title":"Flutter",
      "description":"Flutter",
      "image":"/flutter.svg",
      "created_at":"2022-08-01T00:00:00.000000Z",
      "updated_at":"2022-08-01T00:00:00.000000Z"
    },
    {
      "id":2,
      "title":"React",
      "description":"React",
      "image":"/react.svg",
      "created_at":"2022-08-01T00:00:00.000000Z",
      "updated_at":"2022-08-01T00:00:00.000000Z"
    },
    {
      "id":3,
      "title":"Node.js",
      "description":"Node.js",
      "image":"/node.svg",
      "created_at":"2022-08-01T00:00:00.000000Z",
      "updated_at":"2022-08-01T00:00:00.000000Z"
    },
    {
      "id":4,
      "title":"NextJs",
      "description":"NextJs",
      "image":"/next.svg",
      "created_at":"2022-08-01T00:00:00.000000Z",
      "updated_at":"2022-08-01T00:00:00.000000Z"
    },
    {
      "id":5,
      "title":"Laravel",
      "description":"Laravel",
      "image":"/laravel.svg",
      "created_at":"2022-08-01T00:00:00.000000Z",
      "updated_at":"2022-08-01T00:00:00.000000Z"
    }
    ]
    // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']
  );

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
    <div className="max-w-7xl mx-auto">
      <div className=''>
        <h1 className='text-2xl font-bold py-4'>Skills</h1>
        <div className='flex flex-wrap'>
          {skills.map((skill) => (
            <div className='flex flex-col items-center p-2 shadow-md border-1 border-gray-300 rounded bg-linear-to-r from-green-200 to-yellow-100 w-1/4 relative' key={skill.id}>
              <div className='flex gap-2 bg-gray-300 p-1 opacity-50 hover:opacity-100 rounded absolute top-1 right-1'>
                <i className='bi bi-pencil text-green-700 hover:cursor-pointer' onClick={handleSave}></i>
                <i className='bi bi-trash text-red-600 hover:cursor-pointer' onClick={()=>handleDelete(5)}></i>
              </div>
              <img className='w-40 h-40' src={skill.image}/>
              <p>{skill.title}</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 