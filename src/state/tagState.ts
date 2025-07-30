import { create } from "zustand";

interface TagState {
    tagList: any[];
    getTags: () => Promise<void>;
    createTag: (tag: string) => Promise<void>;
    deleteTag: (id: string) => Promise<boolean>;
    updateTag: (id: string, tag: string) => Promise<void>;
}

const TagState = create<TagState>((set)=>({
    tagList:[],
    getTags: async()=>{
        const response = await fetch('/api/tag');
        const data = await response.json();
        set({tagList: data.data});
    },

    createTag: async(tag:string)=>{
        const response = await fetch('/api/tag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: tag,
            }),
        });
        const data = await response.json();
        set({tagList: data.data});
    },

    deleteTag: async(id:string)=>{
        const response = await fetch(`/api/tag/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        set({tagList: data.data});
        return response.ok;
    },

    updateTag: async(id:string, tag:string)=>{
        const response = await fetch(`/api/tag/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: tag,
            }),
        });
        const data = await response.json();
        set({tagList: data.data});
    },

}));

export default TagState;
