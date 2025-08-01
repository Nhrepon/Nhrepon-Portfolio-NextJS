import {create} from "zustand/react";

interface ProjectStateInterface {
    projectList: any[];
    totalProject: number;
    fetchProject: (skip: number, limit: number) => Promise<void>;
    createProject: (project: any) => Promise<any>;
}

const ProjectState = create<ProjectStateInterface>((set) => ({
    projectList: [],
    totalProject: 0,
    fetchProject: async (skip, limit) => {
            const response = await fetch(`/api/projects?skip=${skip}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            set({projectList: data.data, totalProject: data.totalProject});
        },
    createProject: async (project) => {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }
        );
        return await response.json();
    }
}));

export default ProjectState;