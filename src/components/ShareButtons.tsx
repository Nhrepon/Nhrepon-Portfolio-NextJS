"use client";
import Link from "next/link";
type Props = {
    blog: any

}
export default function ShareButtons({ blog }: Props) {
    // const siteUrl = window.location.href;
    //const siteUrl = window.location.href;
    //console.log(siteUrl);

    return (
        <div className="blog-post-share-icons flex gap-4 mt-4">
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://www.facebook.com/sharer/sharer.php`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-facebook text-blue-500 text-2xl" title="Facebook" aria-label="Facebook" aria-hidden="false" aria-describedby={"facebook"} aria-details={"facebook"}></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://twitter.com/intent/tweet?text=${blog.title}`}
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-twitter text-blue-500 text-2xl" title="Twitter" aria-label="Twitter" aria-hidden="false" aria-describedby={"twitter"} aria-details={"twitter"}></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://www.linkedin.com/shareArticle?mini=true`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-linkedin text-blue-500 text-2xl" title="LinkedIn" aria-label="LinkedIn" aria-hidden="false" aria-describedby={"linkedin"} aria-details={"linkedin"}></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-red-500" 
                href={`https://www.pinterest.com/sharer.php`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-pinterest text-red-500 text-2xl" title="Pinterest" aria-label="Pinterest" aria-hidden="false" aria-describedby={"pinterest"} aria-details={"pinterest"}></i>
            </Link>
        </div>
    );
}
