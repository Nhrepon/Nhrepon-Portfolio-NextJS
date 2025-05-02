'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

const About = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    
    toast.success("Login success");
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Signup</div>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3 mx-auto">
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Name" />
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" />
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Password" />
            
            <button className="bg-green-700 text-white p-2 rounded-md" type="submit">Send</button>
        </form>
    </div>
  );
};

export default About; 