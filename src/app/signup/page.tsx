'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpPage = () => {

  const [userForm, setUserForm] = useState({
      userName: "",
      email: "",
      password: "",
  });
  const userFormOnChange = (name: string, value: string) => {
      setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!userForm.email || !userForm.password) {
      toast.error("Please fill in all fields");
      return;
    }
    const response = await axios.post('/api/users/signup', userForm);
    response.data.status === "success" ? toast.success(response.data.message) : toast.error(response.data.message);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Signup</div>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3 mx-auto">
            <input name="userName" value={userForm.userName} onChange={(e) => userFormOnChange("userName", e.target.value)} className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="Name" />
            <input name="email" value={userForm.email} onChange={(e) => userFormOnChange("email", e.target.value) } className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" />
            <input name="password" value={userForm.password} onChange={(e) => userFormOnChange("password", e.target.value) } className="border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Password" />
            
            <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <i className="bi bi-image text-4xl"></i>
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              
            <button 
              className={`p-2 rounded-md ${
                !userForm.email || !userForm.userName || !userForm.password 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-800'
              } text-white`} 
              type="submit"
              disabled={!userForm.email || !userForm.userName || !userForm.password}
            >
              Send
            </button>
        </form>
    </div>
  );
};

export default SignUpPage;