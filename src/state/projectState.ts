import {create} from "zustand/react";

interface ProjectStateInterface {
    projectList: any[];
    totalProject: number;
    fetchProject: (skip: number, limit: number) => Promise<void>;
    fetchProjectById: (id: string) => Promise<any>;
    createProject: (project: any) => Promise<any>;
    deleteProject: (id: string) => Promise<any>;
    updateProject: (id:string, project: any) => Promise<any>;

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
    fetchProjectById: async (id: string) => {
        const response = await fetch(`/api/projects?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        const data = await response.json();
        set({projectList: data.data});
        return data;
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
    },
    updateProject: async (id:string, project: any) => {
        const response = await fetch(`/api/projects?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }
        );
        return await response.json();
    },
    deleteProject: async (id: string) => {
        const response = await fetch(`/api/projects?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        return await response.json();
    }
}));

export default ProjectState;