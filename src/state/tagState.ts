import { create } from "zustand";

interface TagState {
    tagList: any[];
    total: number;
    loaded: number;
    getTags: (skip: number, limit: number) => Promise<any>;
    fetchTagById: (id: string) => Promise<any>;
    createTag: (tag: any) => Promise<any>;
    deleteTag: (id: string) => Promise<boolean>;
    updateTag: (tag: any) => Promise<any>;
}

const TagState = create<TagState>((set)=>({
    tagList:[],
    total: 0,
    loaded: 0,
    getTags: async(skip: number, limit: number)=>{
        const response = await fetch(`/api/tag?skip=${skip}&limit=${limit}`);
        const data = await response.json();
        set({tagList: data.data, total: data.total, loaded: data.loaded});
        return data;
    },
    fetchTagById: async(id:string)=>{
        const response = await fetch(`/api/tag?id=${id}`);
        const data = await response.json();
        return data;
    },
    createTag: async(tag:any)=>{
        const response = await fetch('/api/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tag),
        });
        const data = await response.json();
        set({tagList: data.data});
        return data;
    },

    deleteTag: async(id:string)=>{
        const response = await fetch(`/api/tag/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        set({tagList: data.data});
        return response.ok;
    },

    updateTag: async(tag:any)=>{
        const response = await fetch(`/api/tag`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tag),
        });
        const data = await response.json();
        set({tagList: data.data});
        return data;
    },

}));

export default TagState;
