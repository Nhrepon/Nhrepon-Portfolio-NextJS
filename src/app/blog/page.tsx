"use client";
import BlogCard from "@/components/blog/BlogCard";
import BlogState from "@/state/blogState";
import { useEffect } from "react";
import Pagination from "@/components/dashboard/Pagination";

const BlogPage = () => {

const {blogList, fetchBlogs, total, loaded} = BlogState();
useEffect(() => {
    (async () => {
        await fetchBlogs(0, 6);
    })()
}, []);

const handlePageChange = (page: number) => {
    fetchBlogs((page - 1) * 6, 6);
};

    
    return (
        <div className="min-h-screen ">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center py-4">Blogs</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">Here are some of my Flutter and Web development latest blogs</p>
                <hr className="border-gray-400 dark:border-gray-600 mb-6"/>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogList.map((blog: any) => (
                        <BlogCard key={blog._id+"-blog-card-blog-page"} blog={blog}/>
                    ))}
                </div>
                <div className="w-full flex justify-center items-center my-6">
                <Pagination total={total} loaded={loaded} limit={6} onPageChange={handlePageChange}/>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;