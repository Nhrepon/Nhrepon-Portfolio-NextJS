import Image from "next/image"
import { TimestampToDate, truncateText } from "@/utility/Utility"
import Link from "next/link"

const BlogCard = ({ blog }) => {
    return (
        <div key={blog._id+"-blog-card"} className="card max-w-sm overflow-hidden rounded-md shadow-lg bg-white dark:bg-gray-800">
            <Link href={`/blog/${blog.slug}`}>
                <Image className="aspect-16/9"
                    src={blog.image}
                    alt={blog.title}
                    title={blog.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={blog.image}
                />
            </Link>
            <div className="blog-card-meta pt-2 pe-2 flex gap-2 justify-between items-center text-xs">
                <span className="flex gap-1 items-center"><i className="bi bi-person"></i>{blog.author[0].userName}</span>
                <span className="flex gap-1 items-center"><i className="bi bi-calendar"></i>{truncateText(blog.category.map((category) => category.name).join(", "), 15)}</span>
                <span className="flex gap-1 items-center"><i className="bi bi-tag"></i>{truncateText(blog.tag.map((tag) => tag.name).join(", "), 15)}</span>
            </div>

            <Link href={`/blog/${blog.slug}`}>
                <div className="card-body p-2">
                    <h2 className="text-lg text-gray-900 dark:text-white">{truncateText(blog.title, 100)}</h2>
                    {/* <p className="text-gray-600 text-sm">{truncateText(blog.content, 100)}</p> */}
                </div>
            </Link>

            <div className="p-2 flex gap-6 justify-between text-sm">
                <span><i className="bi bi-clock"></i>{TimestampToDate(blog.createdAt)}</span>
                <div className="flex gap-4">
                    <span><i className="bi bi-eye text-blue-500"></i>{blog.meta.views || 0}</span>
                    <span><i className="bi bi-chat text-blue-500"></i>{blog.commentsCount}</span>
                    <span><i className="bi bi-heart-fill text-green-500"></i>{blog.meta.likes || 0}</span>
                </div>
            </div>

        </div>
    )
}
export default BlogCard;