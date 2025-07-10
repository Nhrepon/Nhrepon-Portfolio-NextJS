'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/nhrepon',
      icon: "bi bi-github",
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/nhrepon',
      icon: "bi bi-linkedin",
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/nhrepon',
      icon: "bi bi-twitter",
    },{
      name: 'Facebook',
      href: 'https://twitter.com/nhrepon',
      icon: "bi bi-facebook",
    },{
      name: 'Youtube',
      href: 'https://twitter.com/nhrepon',
      icon: "bi bi-youtube",
    },
  ];

  const quickLinks = [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Contact',
      href: '/contact',
    },{
      title: 'Blogs',
      href: '/blogs',
    },
    {
      title: 'Privacy Policy',
      href: '/privacy',
    },
    {
      title: 'Terms of Service',
      href: '/terms',
    },
  ];

  return (
    <footer className="bg-green-700 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="">
            <h3 className="font-semibold text-white tracking-wider py-2">NHRepon</h3>
            <hr />
            <p className="text-white py-3">
              Mobile Application Development with Flutter, Java and React Native. 
              Web Application Development with MERN, NextJs, Laravel, React and DotNet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase py-2">
              Quick Links
            </h3>
            <hr />
            <ul className="mt-4 space-y-4">
              {quickLinks.map((item, index)=>(
                <li key={index}>
                  <Link href={item.href} className="text-base text-white hover:text-indigo-300 hover:ps-1 transition-all ease-in-out duration-300">
                  {item.title}
                  </Link>
                </li>
              ))}
              
              
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase py-2">
              Connect
            </h3>
            <hr />
            <div className="mt-4 flex space-x-6">
              {socialLinks.map((item) => (
                <Link key={item.name} href={item.href} className='hover:scale-110 duration-500 ease-in-out transition-all dark:text-gray-400 text-3xl text-green-100 hover:text-white'><i className={item.icon}></i></Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8  pt-8">
          <p className="text-base text-white text-center">
            &copy; {currentYear} <Link href={"/"}>NHRepon.</Link> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 