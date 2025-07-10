import Image from "next/image"
import { truncateText } from "@/utility/Utility"
import Link from "next/link"
import { TimestampToDate } from "@/utility/Utility"

const BlogCard = ({blog}) => {
    return (
        <div key={blog.id} className="card max-w-sm overflow-hidden rounded-md shadow-lg bg-white dark:bg-gray-800">
                            <Link href={`/blogs/${blog.id}`}>
                                <Image className="aspect-16/9"
                                    src={blog.img}
                                    alt={blog.title}
                                    title={blog.title}
                                    width={500}
                                    height={500}
                                />
                            </Link>
                            <div className="blog-card-meta pt-2 flex gap-4 items-center text-sm">
                                <span><i className="bi bi-person"></i>{blog.author}</span>
                                <span><i className="bi bi-clock"></i>{TimestampToDate(blog.createdAt)}</span>
                                <span><i className="bi bi-tag"></i>{blog.category}</span>
                            </div>
                            
                            <Link href={`/blogs/${blog.id}`}>
                            <div className="card-body p-2">
                                <h2 className="font-bold text-gray-900 dark:text-white text-lg">{truncateText(blog.title, 35)}</h2>
                                <p className="text-gray-600 text-sm">{truncateText(blog.content, 100)}</p>
                            </div>
                            </Link>

                            <div className="p-2 flex gap-6 justify-end text-sm">
                                <span><i className="bi bi-eye"></i>{blog.views || 0}</span>
                                <span><i className="bi bi-chat"></i>{blog.comments || 0}</span>
                                <span><i className="bi bi-heart"></i>{blog.likes || 0}</span>
                            </div>
                            
                        </div>
    )
}
export default BlogCard;