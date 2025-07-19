import { create } from "zustand";

const CommentState = create((set) => ({
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

    