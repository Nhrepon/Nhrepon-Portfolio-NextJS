'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { setSessionStorateItem } from "@/utility/Utility";
import Link from 'next/link';

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
    const response = await axios.post('/api/users/login', { email: loginData.email, password: loginData.password });
    if (response.data.status === "success") {
      setSessionStorateItem("email", response.data.data.email);
      toast.success("Login success");
      router.push('/dashboard');
    } else {
      toast.error(response.data.message);
    }

  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col items-center justify-between bg-gray-50 shadow-lg rounded-2xl p-8 min-w-[400] w-1/3 max-w-[800] mx-auto'>
        <div className="text-4xl font-bold my-6">Login</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4  w-full">
          <input name="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="border-1 border-gray-200 rounded-md p-2" type="email" placeholder="Email" />
          <input name="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="border-1 border-gray-200 rounded-md p-2" type="password" placeholder="Password" />

          <button className={`p-2 rounded-md hover:cursor-pointer ${
                !loginData.email || !loginData.password
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-800'
              } text-white`} 
              disabled={!loginData.email || !loginData.password} type="submit">Send</button>
          <div>
            <span className='text-sm'>Don't have an account? <Link className='text-green-600 hover:text-green-700' href={"/signup"}>Create account</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default About; 