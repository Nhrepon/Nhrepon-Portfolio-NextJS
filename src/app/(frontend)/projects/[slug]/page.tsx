'use client';
import React from 'react'
import { useParams } from 'next/navigation';

export default function SingleProject() {
    const {slug} = useParams();
    
    console.log(slug);
  return (
    <div className='min-h-screen  bg-gray-200 dark:bg-gray-900 py-20 w-full'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2>Single Project</h2>
            <p>{slug}</p>
        </div>
    </div>
  )
}
