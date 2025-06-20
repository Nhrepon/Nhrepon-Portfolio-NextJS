'use client';
import {containerVariants, itemVariants} from "@/utility/motion";
import {motion} from "framer-motion";
import Link from "next/link";

const Blogs = () => {
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
        <div className="bg-gray-200 dark:bg-gray-900 w-full py-16 px-4 sm:px-6 lg:px-8 ">
            <section className="max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={itemVariants}
                               className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Blogs
                    </motion.h2>
                    <motion.p variants={itemVariants}
                              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Here are some of my recent projects. Each one was built to solve a specific
                        problem or explore new technologies.
                    </motion.p>
                </motion.div>
                {/*<h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">Blogs</h1>*/}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogList.map((blog) => (
                        <div key={blog.id}
                             className="overflow-hidden rounded-md shadow-lg bg-white dark:bg-gray-800 hover:cursor-pointer hover:shadow-2xl">
                            <img className="aspect-4/3 hover:scale-105 transition duration-500 ease-in-out"
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
                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/blogs"
                        className="inline-flex items-center px-6 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                        View All Blogs
                        <i className='bi bi-arrow-right ml-2'></i>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Blogs;