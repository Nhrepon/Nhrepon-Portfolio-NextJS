'use client';

import { DeleteAlert } from '@/utility/Utility';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  

  
    // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']

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
        <h1 className='text-2xl font-bold py-4'>New blog</h1>
        
      </div>
    </div>
  );
} 