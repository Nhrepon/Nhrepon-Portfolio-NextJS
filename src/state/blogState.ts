import {create} from "zustand";

interface BlogStateInterface {
    blogList: any[];
    fetchBlogs: () => Promise<void>;
    blog: any;
    getBlogById: (slug: string) => Promise<any>;
    createBlog: (blog: any) => Promise<any>;
    updateBlog: (blog: any) => Promise<any>;
    deleteBlog: (id: string) => Promise<boolean>;
}

const BlogState = create<BlogStateInterface>((set) => ({
    blogList: [],
    fetchBlogs: async () => {
        const response = await fetch('/api/blog', );
        const data = await response.json();
        if(data.status === "success"){
            set({ blogList: data.data });
        }
    },
    blog:{},
    getBlogById: async (slug: string) => {
        set({ blog: {} });
        const response = await fetch(`/api/blog?slug=${slug}`);
        const data = await response.json();
        set({ blog: data.data });
        return data;
    },

    createBlog: async (blog: any) => {
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        return await response.json();
    },

    updateBlog: async (blog: any) => {
        const response = await fetch('/api/blog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        return await response.json();
    },
    deleteBlog: async (id: string) => {
        const response = await fetch('/api/blog', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        return data.status === "success";

    },



}));

export default BlogState;
