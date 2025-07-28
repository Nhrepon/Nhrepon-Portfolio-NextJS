"use client";
import { useParams, usePathname } from "next/navigation";
import "@/app/blog/style.css";
import Image from "next/image";
import { TimestampToDate, truncateText } from "@/utility/Utility";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import BlogState from "@/state/blogState";
import { useEffect } from "react";
import CommentState from "@/state/commentState";
import ShareButtons from "@/components/ShareButtons";




const SingleBlog = () => {
    const { slug } = useParams();
    const currentPath = usePathname();
    const { blogList, getBlogById, blog, fetchBlogs } = BlogState();
    const { addComment, getCommentListByBlogId, commentList } = CommentState();


    useEffect(() => {
        const fetchBlogAndComments = async () => {
            try {
                await fetchBlogs();
                await getBlogById(slug);

                if (blog && blog._id) {
                    await getCommentListByBlogId(blog._id);
                }
            } catch (error) {
                toast.error('Failed to load blog or comments');
            }
        };

        fetchBlogAndComments();
    }, [slug]);


    console.log("Slug: " + slug);
    console.log("Blog id: " + blog._id);
    // console.log(blog);



    const [comment, setComment] = useState({
        blogId: blog && blog._id ? blog._id : '',
        name: "",
        email: "",
        comment: "",
    });
    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.name || !comment.email || !comment.comment) {
            toast.error("Please fill in all fields");
            return;
        }

        const data = await addComment(comment);
        if (data.status === "success") {
            toast.success(data.message);
            setComment({
                blogId: blog._id,
                name: "",
                email: "",
                comment: "",
            });
            await getBlogById(slug);
            await getCommentListByBlogId(blog._id);
        } else {
            toast.error(data.error);
        }

    };

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
            await getBlogById(slug);
        } else {
            toast.error(data.message);
        }

    }




    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="single-blog max-w-[600px] mx-auto flex flex-col gap-6 items-center">
                    <div className="single-blog-content flex flex-col gap-6 items-center">
                        <div className="w-full">{currentPath.split("/").slice(1).join(" > ")}</div>
                        {blog.image &&
                            <Image className="aspect-16/9 rounded-md shadow-lg"
                                src={blog.image}
                                alt={blog.title}
                                title={blog.title}
                                width={1200}
                                height={800}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={blog.image}
                            />
                        }
                        <div className="w-full my-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
                            <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.author?.[0]?.userName ?? 'Unknown'}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.category || []).map((category) => category.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.tag || []).map((tag) => tag.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{TimestampToDate(blog.updatedAt)}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.commentsCount} Comments</span>
                            </div>
                        </div>

                        <div className="single-blog-body bg-gray-50 dark:bg-gray-800 p-4 rounded-md" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
                        <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md"><i onClick={handleLike} className="bi bi-heart-fill text-green-500 font-bold hover:cursor-pointer"></i> {blog.meta?.likes ?? "0"} Likes</span>
                        <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.meta?.views ?? 0} Views</span>
                    </div>

                    <div className="blog-post-share w-full flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <h3 className="text-lg text-gray-900 dark:text-white">Share</h3>
                        <hr className="border-gray-400 dark:border-gray-600" />
                        <ShareButtons blog={blog} />
                    </div>

                    <div className="latest-blog flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h3>Latest Blog</h3>
                        <hr />
                        <div className="flex gap-6">
                            {blogList.slice(0, 3).map((blog, i) => {
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

                    <div className="leave-comment w-full flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2>Leave a Comment</h2>
                        <hr />
                        <form onSubmit={handleComment}>
                            <div className="flex flex-col gap-4">
                                <input value={comment.name} onChange={(e) => setComment({ ...comment, name: e.target.value })} id="name" name="name" className="p-2 rounded-md border border-gray-300" type="text" placeholder="Name" />
                                <input value={comment.email} onChange={(e) => setComment({ ...comment, email: e.target.value })} id="email" name="email" className="p-2 rounded-md border border-gray-300" type="email" placeholder="Email" />
                                <textarea value={comment.comment} onChange={(e) => setComment({ ...comment, comment: e.target.value })} id="comment" name="comment" className="p-2 rounded-md border border-gray-300" cols="30" rows="5"></textarea>
                                <button className="bg-green-500 text-white p-2 rounded-md hover:cursor-pointer hover:bg-green-600" type="submit">Post Comment</button>
                            </div>
                        </form>
                    </div>

                    <div className="comments w-full bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
                        <div className="comment">
                            {blog.commentsCount > 0 ? commentList && commentList.map((item) => (
                                <div key={item._id} className="flex py-2 my-6 shadow-sm rounded-md ">
                                    <div className="flex flex-col p-2 items-center">
                                        <Image src="/person.svg" className="w-12 h-12 min-w-[50px] rounded-full opacity-25" alt={item.name} title={item.name} width={120} height={80} />
                                        <p className="text-gray-600 dark:text-gray-400 text-xs">{item.name}</p>
                                        {/* <p className="text-gray-600 dark:text-gray-400 text-xs">{comment.email}</p> */}
                                    </div>
                                    <div className="flex flex-col h-full items-between px-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.comment}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">{TimestampToDate(item.updatedAt)}</p>
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