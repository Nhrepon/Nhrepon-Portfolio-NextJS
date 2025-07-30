import { create } from "zustand";

interface FileState {
    fileList: any[];
    totalFile: number;
    getFileList: (skip: number, limit: number) => Promise<void>;
    deleteFile: (id: string) => Promise<void>;
}

const FileState = create<FileState>((set) => ({
    fileList: [],
    totalFile: 0,
    getFileList: async (skip: number, limit: number) => {
        const response = await fetch('/api/file?skip=' + skip + '&limit=' + limit);
        const data = await response.json();
        set({ fileList: data.data, totalFile: data.totalFile });
    },
    deleteFile: async (id: string) => {
    const response = await fetch('/api/file?id=' + id, {
        method: 'DELETE',
    });
    const data = await response.json();
    set({ fileList: data.data });
}





}));
export default FileState;
