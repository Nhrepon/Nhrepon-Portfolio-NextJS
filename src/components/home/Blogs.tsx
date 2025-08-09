'use client';
import {containerVariants, itemVariants} from "@/utility/motion";
import {motion} from "framer-motion";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import BlogState from "@/state/blogState";
import { useEffect } from "react";

const Blogs = () => {
    const {blogList, fetchBlogs} = BlogState();
    useEffect(() => {
        (async () => {
            await fetchBlogs(0, 6);
        })()
    }, []);

    return (
        <div className="bg-gray-200 dark:bg-gray-900 w-full py-16 px-4 sm:px-6 lg:px-8 ">
            <section className="max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Blogs
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent projects. Each one was built to solve a specific
                        problem or explore new technologies.
                    </motion.p>
                </motion.div>
                
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {blogList.map((blog) => (
                        <BlogCard key={blog._id+"-blog-card"} blog={blog}/>
                    ))}
                </div>
                <motion.div variants={itemVariants} className="mt-12 text-center">
                    <Link href="/blogs" className="inline-flex items-center px-6 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                        View All Blogs
                        <i className='bi bi-arrow-right ml-2'></i>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Blogs;