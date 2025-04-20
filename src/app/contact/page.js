"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Contact() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log(name, email, message);

    setIsLoading(true);
    setError(null);
    setSuccess(null);
  };
  return(
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-bold">Contact Page</div>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3 mx-auto">
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Name" />
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" />
            <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" placeholder="Message" />
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Send</button>
        </form>
    </div>

  );
}