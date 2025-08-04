'use client'
import { usePathname } from "next/navigation";
import "@/app/blog/style.css";
import Image from "next/image";
import { TimestampToDate } from "@/utility/Utility";
import { toast } from "react-hot-toast";
import BlogState from "@/state/blogState";
import { useEffect } from "react";
import ShareButtons from "@/components/ShareButtons";
import CommentForm from "@/components/blog/CommentForm";
import FeaturedBlogList from "@/components/blog/FeaturedBlogList";

export default function SingleBlog({params}: {params: {slug: string}}) {
    const { slug } = params;
    const currentPath = usePathname();
    const {getBlogById, blog } = BlogState();

    useEffect(() => {
        (
            async () => {
                await getBlogById(slug as string);
            }
        )()
    }, [slug]);

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
            await getBlogById(slug as string);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="single-blog max-w-[600px] mx-auto flex flex-col gap-6 items-center">
                    <div className="single-blog-content flex flex-col gap-6 items-center">
                        <div className="w-full">{"Home" + " > " + currentPath.split("/").slice(1).join(" > ")}</div>
                        {blog.image &&
                            <Image className="aspect-16/9 rounded-md shadow-lg"
                                src={blog.image}
                                alt={blog.title}
                                title={blog.title}
                                width={1200}
                                height={1200}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={blog.image}
                            />
                        }
                        <div className="w-full my-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
                            <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.author?.[0]?.userName ?? 'Unknown'}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.category || []).map((category: any) => category.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.tag || []).map((tag: any) => tag.name).join(", ")}</span>
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

                    <FeaturedBlogList/>

                    <CommentForm blog={blog} />

                </div>
            </section>
        </div>
    );
}