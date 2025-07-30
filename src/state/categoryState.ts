import { create } from "zustand"

interface CategoryState {
    categoryList: any[];
    getCategories: () => Promise<void>;
    createCategory: (category: string) => Promise<void>;
    deleteCategory: (id: string) => Promise<boolean>;
    updateCategory: (id: string, category: string) => Promise<void>;
}

const CategoryState = create<CategoryState>((set)=>({
    categoryList: [],
    getCategories: async()=>{
        const response = await fetch('/api/category');
        const data = await response.json();
        set({categoryList: data.data});
    },

    createCategory: async (category: string): Promise<void> => {
        const response = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: category,
            }),
        });
        const data = await response.json();
        set({categoryList: data});
    },
    deleteCategory: async (id: string): Promise<boolean> => {
        const response = await fetch(`/api/category/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        set({categoryList: data});
        return response.ok;
    },
    updateCategory: async (id: string, category: string): Promise<void> => {
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
