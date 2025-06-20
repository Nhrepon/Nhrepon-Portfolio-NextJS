import {create} from "zustand/react";

interface skill {
    _id: string;
    title: string;
    description: string;
    image: string;
}
interface ISkill {
    skillList: skill[];
    fetchSkills: () => Promise<void>;
}
const skillState = create<ISkill>((set) => ({
    skillList: [],
    fetchSkills: async () => {
        const response = await fetch('/api/skills');
        const data = await response.json();
        set({ skillList: data });
    },

}));

export default skillState;