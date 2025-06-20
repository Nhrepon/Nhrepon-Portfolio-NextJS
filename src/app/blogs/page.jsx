import Image from "next/image";

const BlogPage = () => {

    const blogList = [
        {
            id: 1,
            title: 'Blog 1',
            content: 'Blog content goes here.',
            img: "https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png"
        },
        {
            id: 2,
            title: 'Blog 2',
            content: 'Blog content goes here.',
            img: "https://img.freepik.com/free-photo/futuristic-metaverse-empty-room-product-display-presentation-abstract-technology-scifi-with-neon-light-3d-background_56104-2314.jpg"
        },
        {
            id: 3,
            title: 'Blog 3',
            content: 'Blog content goes here.',
            img: "https://cdn.pixabay.com/photo/2024/06/30/10/28/sky-8862862_640.png"
        },
        {
            id: 4,
            title: 'Blog 4',
            content: 'Blog content goes here.',
            img: "https://www.studio11.co/wp-content/uploads/2016/12/crowning-bg.jpg"
        },
        {
            id: 5,
            title: 'Blog 5',
            content: 'Blog content goes here.',
            img: "https://cdn.pixabay.com/photo/2024/06/30/10/28/sky-8862862_640.png"
        },
        {
            id: 6,
            title: 'Blog 6',
            content: 'Blog content goes here.',
            img: "https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png"
        },
    ]



    return (
        <div className="min-h-screen bg-gray-300 dark:bg-gray-900">
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center py-8">Blogs</h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogList.map((blog) => (
                        <div key={blog.id} className="card max-w-sm overflow-hidden rounded-md shadow-lg bg-white dark:bg-gray-800">
                            <Image className="aspect-16/9"
                                src={blog.img}
                                alt={blog.title}
                                title={blog.title}
                            />
                            {/*<Image src={blog.img} alt={blog.title} title={blog.title} />*/}
                            <div className="card-body p-3">
                                <h2 className="font-bold text-gray-900 dark:text-white text-lg">{blog.title}</h2>
                                <p className="text-gray-700 text-base">{blog.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;