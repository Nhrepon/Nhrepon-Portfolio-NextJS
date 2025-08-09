'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {containerVariants, itemVariants} from "@/utility/motion";

const Hero = () => {



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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              Hello&nbsp; I&lsquo;m
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="block">Nur Hossain Repon</span>
            <span className="block text-green-700 dark:text-blue-400">
              Full Stack Developer &nbsp; Software Engineer
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            I build exceptional digital experiences that make an impact. Specializing in
            modern web technologies and creating solutions that matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-900 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              ><i className={social.icon}></i>
              </Link>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 