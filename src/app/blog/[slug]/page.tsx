import "@/app/blog/style.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TimestampToDate, truncateText, htmlToPlain } from "@/utility/Utility";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";
import CommentForm from "@/components/blog/CommentForm";
import FeaturedBlogList from "@/components/blog/FeaturedBlogList";
import BlogPostMetaData from "@/components/blog/BlogPostMetaData";
import BreadCrumb from "@/components/blog/BreadCrumb";


// { params }: { params: { slug: string } }


export async function generateMetadata(context: {params: Promise<{ slug: string }>}): Promise<Metadata> {
    const params = await context.params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?slug=${params.slug}`, { cache: "no-store" });
    const data = await response.json();
    const blog = data.data;

    if (!response.ok || !blog) {
        return {
            title: "Blog Not Found",
            description: "The requested blog could not be found.",
        };
    }

    return {
        title: blog.title,
        description: truncateText(htmlToPlain(blog.content), 150),
        keywords: blog.tag?.map((tag: any) => tag.name).join(", ") || "blog, article, reading",
        authors: [{ name: blog.author?.[0]?.userName || "NHRepon", url: "https://nhrepon.com" }],
        creator: blog.author?.[0]?.userName || "NHRepon",
        publisher: "NHRepon",
        icons: {
            icon: "/favicon.ico",
            apple: "/apple-touch-icon.png"
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            }
        },
        openGraph: {
            title: blog.title,
            description: truncateText(htmlToPlain(blog.content), 150),
            type: "article",
            images: [{
                url: blog.image,
                width: 1280,
                height: 720,
                alt: blog.title,
            }],
            siteName: "NHRepon Blog",
            locale: "en_US",
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: truncateText(htmlToPlain(blog.content), 150),
            images: [blog.image],
            creator: blog.author?.[0]?.userName || "@NHRepon",
            site: "@NHRepon"
        }
    };
}

export default async function SingleBlog(context: {params: Promise<{ slug: string }>}) {
    const params = await context.params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?slug=${params.slug}`, { cache: "no-store" });
    const data = await response.json();
    const blog = data.data;

    if (!response.ok || !blog) return notFound();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="single-blog max-w-[600px] mx-auto flex flex-col gap-6 items-center">
                    <div className="single-blog-content flex flex-col gap-6 items-center">
                        <div className="w-full"><BreadCrumb segments={["home", "blog", params.slug]} /></div>
                        {blog.image &&
                            <Image
                                className="aspect-16/9 rounded-md shadow-lg"
                                src={blog.image}
                                alt={blog.title}
                                title={blog.title}
                                width={1280}
                                height={720}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={blog.image}
                            />
                        }
                        <div className="w-full my-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
                            <div className="blog-post-meta w-full flex gap-4 justify-start mt-3">
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.author?.[0]?.userName ?? 'Unknown'}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.category || []).map((c: any) => c.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{(blog.tag || []).map((t: any) => t.name).join(", ")}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{TimestampToDate(blog.updatedAt)}</span>
                                <span className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs shadow-sm p-2 rounded-md">{blog.commentsCount} Comments</span>
                            </div>
                        </div>

                        <div className="single-blog-body bg-gray-50 dark:bg-gray-800 p-4 rounded-md" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <BlogPostMetaData blog={blog} />

                    <div className="blog-post-share w-full flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <h3 className="text-lg text-gray-900 dark:text-white">Share</h3>
                        <hr className="border-gray-400 dark:border-gray-600" />
                        <ShareButtons blog={blog} />
                    </div>

                    <FeaturedBlogList />
                    <CommentForm blog={blog} />
                </div>
            </section>
        </div>
    );
}
