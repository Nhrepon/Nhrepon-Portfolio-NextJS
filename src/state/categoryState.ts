import { create } from "zustand"

interface CategoryState {
    categoryList: any[];
    getCategories: () => void;
    createCategory: (category: any) => Promise<any>;
    deleteCategory: (id: string) => void;
    updateCategory: (id: string, category: string) => void;
}

const CategoryState = create<CategoryState>((set)=>({
    categoryList: [],
    getCategories: async()=>{
        const response = await fetch('/api/category');
        const data = await response.json();
        set({categoryList: data.data});
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
    deleteCategory: async (id: string)=> {
        const response = await fetch(`/api/category/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        set({categoryList: data});
        return data;
    },
    updateCategory: async (id: string, category: string)=> {
        const response = await fetch(`/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: category,
            }),
        });
        const data = await response.json();
        set({categoryList: data});
    }
}));

export default CategoryState
