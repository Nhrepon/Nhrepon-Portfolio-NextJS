"use client";
import BlogCard from "@/components/blog/BlogCard";
import BlogState from "@/state/blogState";
import { useEffect } from "react";
import Pagination from "@/components/dashboard/Pagination";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utility/motion";

const BlogPage = () => {


    const { blogList, fetchBlogs, total, loaded } = BlogState();
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
            <motion.section variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-900 dark:text-white text-center py-4">Blogs</motion.h1>
                <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 text-center">Here are some of my Flutter and Web development latest blogs</motion.p>
                <hr className="border-gray-400 dark:border-gray-600 mb-8 mt-4" />
                <motion.div variants={containerVariants} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogList.map((blog: any) => (
                        <BlogCard key={blog._id + "-blog-card-blog-page"} blog={blog} />
                    ))}
                </motion.div>
                <motion.div variants={itemVariants} className="w-full flex justify-center items-center my-6">
                    <Pagination total={total} loaded={loaded} limit={6} onPageChange={handlePageChange} />
                </motion.div>
            </motion.section>
        </div>
    );
};

export default BlogPage;