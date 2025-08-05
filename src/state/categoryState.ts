import { create } from "zustand"

interface CategoryState {
    categoryList: any[];
    total: number;
    loaded: number;
    getCategories: (skip: number, limit: number) => Promise<any>;
    fetchCategoryById: (id: any) => Promise<any>;
    createCategory: (category: any) => Promise<any>;
    deleteCategory: (id: any) => Promise<any>;
    updateCategory: (id: any, category: any) => Promise<any>;
}

const CategoryState = create<CategoryState>((set)=>({
    categoryList: [],
    total: 0,
    loaded: 0,
    getCategories: async( skip: number, limit: number)=>{
        const response = await fetch(`/api/category?skip=${skip}&limit=${limit}`);
        const data = await response.json();
        set({categoryList: data.data, total: data.total, loaded: data.loaded});
        return data;
    },
    fetchCategoryById: async (id:any)=>{
        const response = await fetch(`/api/category?id=${id}`);
        const data = await response.json();
        set({categoryList: data.data});
        return data;
    },

    createCategory: async (category: any)=> {
        const response = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        return await response.json();
    },
    deleteCategory: async (id: any)=> {
        const response = await fetch(`/api/category?id=${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    },
    updateCategory: async (id: any, category: any)=> {
        const response = await fetch(`/api/category?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        return await response.json();
    }
}));

export default CategoryState
