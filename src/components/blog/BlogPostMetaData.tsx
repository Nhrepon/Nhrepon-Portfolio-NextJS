"use client"
import React from 'react'
import { toast } from 'react-hot-toast';
import BlogState from '@/state/blogState';

export default function BlogPostMetaData({ blog }: { blog: any }) {

    const { getBlogById } = BlogState();

    const handleLike = async () => {
        const response = await fetch(`/api/blog/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogId: blog._id }),
        });
        const data = await response.json();
        if (data.status === "success") {
            toast.success("Blog liked");
            await getBlogById(blog.slug);
        } else {
            toast.error(data.message);
        }
    };

    return (

        <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
            <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md"><i onClick={handleLike} className="bi bi-heart-fill text-green-500 font-bold hover:cursor-pointer"></i> {blog.meta?.likes ?? "0"} Likes</span>
            <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.meta?.views ?? 0} Views</span>
        </div>

    )
}
