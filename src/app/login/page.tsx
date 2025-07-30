'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {setEmail} from "@/utility/Utility";

const About = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    const response = await axios.post('/api/users/login', {email:loginData.email, password:loginData.password});
    if(response.data.status === "success"){
      setEmail(response.data.data.email);
      toast.success("Login success");
      router.push('/dashboard');
    }else{
      toast.error(response.data.message);
    }
    
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Login</div>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3 mx-auto">
            <input name="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" />
            <input name="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Password" />
            
            <button className="bg-green-700 text-white p-2 rounded-md hover:cursor-pointer" type="submit">Send</button>
        </form>
    </div>
  );
}

export default About; 