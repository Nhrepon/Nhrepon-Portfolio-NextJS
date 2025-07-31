import { create } from "zustand";


interface CommentState {
    commentList: any[];
    totalComment: number;
    getCommentListByBlogId: (blogId: string) => Promise<void>;
    addComment: (comment: any) => Promise<any>;
}

const CommentState = create<CommentState>((set) => ({
    commentList: [],
    totalComment: 0,
    getCommentListByBlogId: async (blogId: string) => {
        const response = await fetch(`/api/blog/comment?blogId=${blogId}`);
        const data = await response.json();
        set({ commentList: data.data, totalComment: data.total });
    },
    addComment: async(comment: any) => {
        const response = await fetch(`/api/blog/comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(comment),
                });
                const data = await response.json();
                return data;
    },
}));

export default CommentState;

    