import { create } from "zustand";

const BlogState = create((set) => ({
    blogList: [],
    fetchBlogs: async () => {
        const response = await fetch('/api/blog', {cache:"no-cache"});
        const data = await response.json();
        if(data.status === "success"){
            set({ blogList: data.data });
        }
    },
    blog:{},
    getBlogById: async (slug: string) => {
        const response = await fetch(`/api/blog?slug=${slug}`);
        const data = await response.json();
        set({ blog: data.data });
        return data.data;
    },



    createBlog: async (blog: any) => {
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        const data = await response.json();
        if(data.status === "success"){
            set({ blogList: data.data });
        }
    },

    updateBlog: async (blog: any) => {
        const response = await fetch('/api/blog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        const data = await response.json();
        return data;
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
        if(data.status === "success"){
            return true;
        }
        return false;
    },



}));

export default BlogState;
