"use client";

import Link from "next/link";

export default function ShareButtons({ blog }) {
    // const siteUrl = window.location.href;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;
    console.log(siteUrl);

    return (
        <div className="blog-post-share-icons flex gap-4 mt-4">
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-facebook text-blue-500 text-2xl"></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${siteUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-twitter text-blue-500 text-2xl"></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500" 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}&title=${blog.title}`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-linkedin text-blue-500 text-2xl"></i>
            </Link>
            <Link 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-red-500" 
                href={`https://www.pinterest.com/pin/builder/?url=${siteUrl}&media=${blog.image}&description=${blog.title}`} 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <i className="bi bi-pinterest text-red-500 text-2xl"></i>
            </Link>
        </div>
    );
}
