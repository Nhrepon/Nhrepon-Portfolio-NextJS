'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {containerVariants, itemVariants} from "@/utility/motion";

const About = () => {


  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - Present',
      description:
        'Led the development of multiple web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and improved application performance by 40%.',
    },
    {
      role: 'Mobile Application Developer',
      company: 'Neurosoft ltd',
      period: '2025 - Present',
      description:
        'Developed responsive web applications and collaborated with UX designers to create intuitive user interfaces. Reduced page load time by 30%.',
    },
    {
      role: 'Junior Developer',
      company: 'WebTech Solutions',
      period: '2018 - 2019',
      description:
        'Worked on various client projects, focusing on frontend development and user experience. Gained experience in modern web technologies and best practices.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Business Sturdies',
      institution: 'National University',
      period: '2013 - 2015',
      description:
        'Specialized in Software Engineering and Web Development. Graduated with honors.',
    },
    {
      degree: 'Full Stack Web Development with MERN',
      institution: 'Ostad ltd',
      period: '2023',
      description:
        'Intensive 6-week program focusing on full-stack web development with MERN and modern technologies.',
    },{
      degree: 'Mobile Application Development with Flutter',
      institution: 'Ostad ltd',
      period: '2024',
      description:
        'Intensive 6-week program focusing on Mobile Application Development and modern technologies.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              About Me
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              I'm a passionate Full Stack Developer with a love for creating
              exceptional digital experiences. My journey in technology has been
              driven by curiosity and a desire to solve complex problems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile & Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/profile-placeholder.svg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">📍</span>
                  Based in Your Location
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">💼</span>
                  Open to Opportunities
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">🎓</span>
                  Computer Science Graduate
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">🚀</span>
                  5+ Years of Experience
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Experience & Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Experience */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Experience
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-600 dark:before:bg-blue-500"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Education
              </h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-green-600 dark:before:bg-green-500"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.institution} • {edu.period}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Personal Interests */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Interests
              </h2>
              <div className="flex flex-wrap gap-4">
                {[
                  'Programming',
                  'Photography',
                  'Hiking',
                  'Reading',
                  'Gaming',
                  'Walking',
                ].map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 