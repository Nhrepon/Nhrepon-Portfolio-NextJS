import React from 'react'
import BlogState from '@/state/blogState';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncateText } from '@/utility/Utility';

export default function FeaturedBlogList() {
    const { blogList, fetchBlogs } = BlogState();


    useEffect(() => {
        (
            async () => {
                await fetchBlogs();
            }
        )()
    }, []);
    return (
        <div>
            <div className="latest-blog flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                <h3>Latest Blog</h3>
                <hr />
                <div className="flex gap-6">
                    {blogList.slice(0, 3).map((blog: any, i: number) => {
                        return (
                            <div key={i + "-latest-blog"} className="flex w-1/3">
                                <Link href={`/blog/${blog.slug}`} className="w-full">
                                    <Image className="w-full aspect-16/9 rounded shadow-sm" src={blog.image} alt={blog.title} title={blog.title} width={120} height={80} loading="lazy" placeholder="blur" blurDataURL={blog.image} />
                                    <h3 className="text-sm my-2">{truncateText(blog.title, 50)}</h3>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
