import {create} from "zustand/react";

interface ISkill {
    skillList: any[];
    total: number;
    loaded: number;
    fetchSkills: (skip:number, limit:number) => Promise<any>;
}
const skillState = create<ISkill>((set) => ({
    skillList: [],
    total: 0,
    loaded: 0,
    fetchSkills: async (skip:number, limit:number) => {
        const response = await fetch('/api/skills?skip='+skip+'&limit='+limit);
        const data = await response.json();
        set({ skillList: data.data, total: data.total, loaded: data.loaded });
        return data;
    },

}));

export default skillState;