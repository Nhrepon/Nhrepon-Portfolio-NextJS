'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const About = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    userName:"",
    email:"",
    password:""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setUserData({userName, email, password});

    const response = await axios.post('/api/users/signup', userData);
    response.data.status === "success" ? toast.success(response.data.message) : toast.error(response.data.message);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Signup</div>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3 mx-auto">
            <input name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Name" />
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" />
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Password" />
            
            <button 
              className={`p-2 rounded-md ${
                !email || !userName || !password 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-800'
              } text-white`} 
              type="submit"
              disabled={!email || !userName || !password}
            >
              Send
            </button>
        </form>
    </div>
  );
};

export default About; 