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
        <div className="blog-post-share w-full flex flex-col bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h2 className="text-md font-semibold text-gray-900 dark:text-white">Share</h2>
            <hr className="border-gray-400 dark:border-gray-600" />
            <div className="blog-post-share-icons flex gap-4 mt-4">
                <Link
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500"
                    href={`https://www.facebook.com/sharer/sharer.php`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="bi bi-facebook text-blue-500 text-2xl" title="Facebook"></i>
                </Link>
                <Link
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500"
                    href={`https://twitter.com/intent/tweet?text=${blog.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="bi bi-twitter text-blue-500 text-2xl" title="Twitter"></i>
                </Link>
                <Link
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-blue-500"
                    href={`https://www.linkedin.com/shareArticle?mini=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="bi bi-linkedin text-blue-500 text-2xl" title="LinkedIn"></i>
                </Link>
                <Link
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 hover:text-red-500"
                    href={`https://www.pinterest.com/sharer.php`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="bi bi-pinterest text-red-500 text-2xl" title="Pinterest"></i>
                </Link>
            </div>
        </div>


    );
}
