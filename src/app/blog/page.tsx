
import BlogCard from "@/components/blog/BlogCard";

const BlogPage = async () => {
    let blogList = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog`);
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        blogList = data.data;
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="min-h-screen ">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center py-4">Blogs</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">Here are some of my Flutter and Web development latest blogs</p>
                <hr className="border-gray-400 dark:border-gray-600 mb-6"/>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogList.map((blog: any) => (
                        <BlogCard key={blog._id+"-blog-card-blog-page"} blog={blog}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;