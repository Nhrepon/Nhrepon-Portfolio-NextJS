"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utility/motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.name === "" || formData.email === "" || formData.subject === "" || formData.message === ""){
      toast.error("All fields are required!");
      return;
    }else{
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto my-15">
        <div className="text-center py-5">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Us
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-3 text-xl text-gray-500 sm:mt-4">
            Have a question or want to work together? We'd love to hear from you.
          </motion.p>
          
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-lg shadow-lg p-8">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </motion.h2>
            <motion.div className="space-y-6">
              <div className="flex items-center">
                <motion.i variants={itemVariants} className="bi bi-envelope text-2xl text-gray-600"></motion.i>
                <div className="ml-3 ">
                  <motion.h3 variants={itemVariants} className="text-lg font-medium text-gray-900">Email</motion.h3>
                  <motion.p variants={itemVariants} className="mt-1 text-gray-500">contact@nhrepon.com</motion.p>
                </div>
              </div>
              <div className="flex items-center">
                <motion.i variants={itemVariants} className="bi bi-phone text-2xl text-gray-600"></motion.i>
                <div className="ml-3 ">
                  <motion.h3 variants={itemVariants} className="text-lg font-medium text-gray-900">Phone</motion.h3>
                  <motion.p variants={itemVariants} className="mt-1 text-gray-500">+8801829938427 <i className="bi bi-whatsapp text-green-500"></i></motion.p>
                </div>
              </div>
              <div className="flex items-center">
                <motion.i variants={itemVariants} className="bi bi-geo-alt text-2xl text-gray-600"></motion.i>
                <div className="ml-3 ">
                  <motion.h3 variants={itemVariants} className="text-lg font-medium text-gray-900">Location</motion.h3>
                  <motion.p variants={itemVariants} className="mt-1 text-gray-500">Dhaka, Bangladesh.</motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <motion.label variants={itemVariants} htmlFor="name" className="block text-sm font-medium text-gray-700">Name</motion.label>
                <motion.input variants={itemVariants} type="text" name="name" id="name" value={formData.name} onChange={handleChange} required autoComplete="name" className="block w-full rounded bg-white p-2 border border-gray-300" />
              </div>

              <div>
                <motion.label variants={itemVariants} htmlFor="email" className="block text-sm font-medium text-gray-700">Email</motion.label>
                <motion.input variants={itemVariants} type="email" name="email" id="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="block w-full rounded bg-white p-2 border border-gray-300" />
              </div>

              <div>
                <motion.label variants={itemVariants} htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</motion.label>
                <motion.input variants={itemVariants} type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required autoComplete="given-name" className="block w-full rounded bg-white p-2 border border-gray-300" />
              </div>

              <div>
                <motion.label variants={itemVariants} htmlFor="message" className="block text-sm font-medium text-gray-700">Message</motion.label>
                <motion.textarea variants={itemVariants} name="message" id="message" placeholder="Message" required rows={4} value={formData.message} onChange={handleChange} className="block w-full rounded bg-white p-2 border border-gray-300" />
              </div>
              <div className="flex justify-center">
                <motion.button variants={itemVariants} onClick={handleSubmit} type="submit" className={`w-fit py-2 px-4 rounded text-white bg-green-700 hover:bg-green-800 cursor-pointer transition-all duration-300 ease-in-out`}>Send Message</motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
