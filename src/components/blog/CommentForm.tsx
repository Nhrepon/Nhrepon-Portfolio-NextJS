"use client"
import React from 'react'
import CommentState from '@/state/commentState';
import {useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';
import {TimestampToDate} from '@/utility/Utility';
import Image from 'next/image';


export default function CommentForm({blog}: {blog: any}) {
        const { addComment, getCommentListByBlogId, commentList } = CommentState();
        const [comment, setComment] = useState({
            blogId: "",
            name: "",
            email: "",
            comment: "",
        });

        useEffect(() => {
            (async ()=>{
                if (blog && blog._id) {
                    await getCommentListByBlogId(blog._id);
                    setComment((prev) => ({
                        ...prev,
                        blogId: blog._id,
                    }));
                }
            })()
        }, [blog._id]);
    
    
        const handleComment = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!comment.name || !comment.email || !comment.comment) {
                toast.error("Please fill in all fields");
                return;
            }
    
            const data = await addComment(comment);
            if (data.status === "success") {
                toast.success(data.message);
                setComment({
                    blogId: blog._id,
                    name: "",
                    email: "",
                    comment: "",
                });
                await getCommentListByBlogId(blog._id);
            } else {
                toast.error(data.error);
            }
    
        };

  return (
    <div className="w-full">
        <div className="leave-comment w-full flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2>Leave a Comment</h2>
                        <hr />
                        <form onSubmit={handleComment}>
                            <div className="flex flex-col gap-4">
                                <input value={comment.name} onChange={(e) => setComment({ ...comment, name: e.target.value })} id="name" name="name" className="p-2 rounded-md border border-gray-300" type="text" placeholder="Name" />
                                <input value={comment.email} onChange={(e) => setComment({ ...comment, email: e.target.value })} id="email" name="email" className="p-2 rounded-md border border-gray-300" type="email" placeholder="Email" />
                                <textarea value={comment.comment} onChange={(e) => setComment({ ...comment, comment: e.target.value })} id="comment" name="comment" className="p-2 rounded-md border border-gray-300" cols={30} rows={5} placeholder="Write your comment here"></textarea>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:cursor-pointer hover:bg-green-700 w-fit self-end" type="submit">Post Comment</button>
                            </div>
                        </form>
                    </div>

                    <div className="comments w-full bg-gray-50 dark:bg-gray-800 p-6 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>
                        <div className="comment">
                            {blog.commentsCount > 0 ? commentList && commentList.map((item) => (
                                <div key={item._id} className="flex py-2 my-6 shadow-sm rounded-md ">
                                    <div className="flex flex-col p-2 items-center">
                                        <Image src="/person.svg" className="w-12 h-12 min-w-[50px] rounded-full opacity-25" alt={item.name} title={item.name} width={1280} height={720} />
                                        <p className="text-gray-600 dark:text-gray-400 text-xs">{item.name}</p>
                                        {/* <p className="text-gray-600 dark:text-gray-400 text-xs">{comment.email}</p> */}
                                    </div>
                                    <div className="flex flex-col h-full items-between px-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.comment}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">{TimestampToDate(item.updatedAt)}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
                            )}
                        </div>
                    </div>
    </div>
  )
}
