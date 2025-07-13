"use client";
import { useParams } from "next/navigation";
import "@/app/blogs/style.css";
import Image from "next/image";
import { TimestampToDate, truncateText } from "@/utility/Utility";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import BlogState from "@/state/blogState";
import { useEffect } from "react";
import {commentList} from "@/db/data";


const SingleBlog = () => {
    const { id } = useParams();
    const {blogList, getBlogById, blog} = BlogState();
    console.log("Blog id: "+id);
    const siteUrl = "http://localhost:3000";

    useEffect(() => {
        (async () => {
           await getBlogById(id);
        })()
      }, []);
      
    const [comment, setComment] = useState({
        name: "",
        email: "",
        comment: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.name || !comment.email || !comment.comment) {
            toast.error("Please fill in all fields");
            return;
        }
        const newComment = {
            id: commentList.length + 1,
            name: comment.name,
            email: comment.email,
            comment: comment.comment,
            blogId: parseInt(id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        toast.success("Comment added successfully");
        setComment({
            name: "",
            email: "",
            comment: "",
        });
    };




    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="single-blog max-w-[600px] mx-auto flex flex-col gap-6 items-center">
                    <div className="single-blog-content flex flex-col gap-6 items-center">
                        <Image className="aspect-16/9 rounded-md shadow-lg"
                            src={blog.image}
                            alt={blog.title}
                            title={blog.title}
                            width={600}
                            height={400}
                        />
                        <div className="w-full my-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
                            <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.author?.[0]?.userName ?? 'Unknown'}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.category || []).map((category) => category.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.tag || []).map((tag) => tag.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{TimestampToDate(blog.updatedAt)}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{commentList.filter((comment) => comment.blogId === blog.id).length} Comments</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <div className="blog-post-share w-full flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <h3 className="text-lg text-gray-900 dark:text-white">Share</h3>
                        <hr className="border-gray-400 dark:border-gray-600" />
                        <div className="blog-post-share-icons flex gap-4 mt-4">
                            <Link className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl + blog.slug}`} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook text-blue-500 text-2xl"></i>
                            </Link>
                            <Link className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${siteUrl + blog.slug}`} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter text-blue-500 text-2xl"></i>
                            </Link>
                            <Link className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl + blog.slug}&title=${blog.title}`} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin text-blue-500 text-2xl"></i>
                            </Link>
                            <Link className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-red-500" href={`https://www.pinterest.com/pin/builder/?url=${siteUrl + blog.slug}&media=${blog.img}&description=${blog.title}`} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-pinterest text-red-500 text-2xl"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="latest-blog flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h3>Latest Blog</h3>
                        <hr />
                        <div className="flex gap-6">
                            {blogList.slice(0, 3).map((blog, i) => {
                                return (
                                    <div key={i} className="flex w-1/3">
                                        <Link href={`/blogs/${blog._id}`}>
                                            <Image className="w-full aspect-16/9 rounded shadow-sm" src={blog.image} alt={blog.title} title={blog.title} width={120} height={80} />
                                            <h3 className="text-sm my-2">{truncateText(blog.title, 50)}</h3>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="leave-comment w-full flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2>Leave a Comment</h2>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                <input value={comment.name} onChange={(e) => setComment({ ...comment, name: e.target.value })} id="name" name="name" className="p-2 rounded-md border border-gray-300" type="text" placeholder="Name" />
                                <input value={comment.email} onChange={(e) => setComment({ ...comment, email: e.target.value })} id="email" name="email" className="p-2 rounded-md border border-gray-300" type="email" placeholder="Email" />
                                <textarea value={comment.comment} onChange={(e) => setComment({ ...comment, comment: e.target.value })} id="comment" name="comment" className="p-2 rounded-md border border-gray-300" cols="30" rows="5"></textarea>
                                <button className="bg-green-500 text-white p-2 rounded-md hover:cursor-pointer hover:bg-green-600" type="submit">Post Comment</button>
                            </div>
                        </form>
                    </div>

                    <div className="comments bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
                        <div className="comment">
                            {commentList.filter((comment) => comment.blogId === blog._id).length > 0 ? commentList.filter((comment) => comment.blogId === blog._id).map((comment) => (
                                <div key={comment.id} className="flex py-2 my-6 shadow-sm rounded-md ">
                                    <div className="flex flex-col p-2 items-center">
                                        <Image src="/person.svg" className="w-12 h-12 rounded-full opacity-25" alt={comment.name} />
                                        <p className="text-gray-600 dark:text-gray-400 text-xs">{comment.name}</p>
                                        {/* <p className="text-gray-600 dark:text-gray-400 text-xs">{comment.email}</p> */}
                                    </div>
                                    <div className="flex flex-col h-full items-between px-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{comment.comment}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">{TimestampToDate(comment.updatedAt)}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default SingleBlog;