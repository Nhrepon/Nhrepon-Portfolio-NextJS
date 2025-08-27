'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { containerVariants, itemVariants } from "@/utility/motion";

const About = () => {


  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Neurosoft ltd',
      period: '2020 - Present',
      description:
        'Attended the development of multiple web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and improved application performance by 40%.',
    },
    {
      role: 'Mobile Application Developer',
      company: 'Neurosoft ltd',
      period: '2024 - Present',
      description:
        'Attended the development of multiple mobile applications using Flutter. Implemented CI/CD pipelines and improved application performance.',
    }
  ];

  const education = [
    {
      degree: 'Full Stack Web Development with MERN',
      institution: 'Ostad ltd',
      period: '2023',
      description:
        'Completed my Full Stack Web Development with MERN from Ostad ltd.',
    },
    {
      degree: 'Mobile Application Development with Flutter',
      institution: 'Ostad ltd',
      period: '2024',
      description:
        'Completed my Mobile Application Development with Flutter from Ostad ltd.',
    },
    {
      degree: 'ASP.NET Core Career Track',
      institution: 'Ostad ltd',
      period: '2024',
      description:
        'Completed my ASP.NET Core Career Track from Ostad ltd.',
    },
    {
      degree: 'Bachelor of Business Sturdies',
      institution: 'National University',
      period: '2013 - 2015',
      description:
        'Completed my Bachelor of Business Sturdies from National University.',
    },
  ];

  const interests =
    [
      'Programming',
      'Mobile App Development',
      'Web App Development',
      'Learning New Technologies',
      'Debugging',
      'Reading',
      'Gaming',
      'Walking',
    ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              I'm a passionate Full Stack Developer with a love for creating
              exceptional digital experiences. My journey in technology has been
              driven by curiosity and a desire to solve complex problems.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile & Skills */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square rounded-md overflow-hidden">
                <Image
                  //src="/profile-placeholder.svg"
                  src="/nhrepon.jpg"
                  alt="NHRepon - Full Stack Developer & Mobile Application Developer"
                  className="object-cover"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/nhrepon.jpg"
                />
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">📍</span>
                  Dhaka, Bangladesh
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">💼</span>
                  Open to Opportunities
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">🎓</span>
                  Full Stack Developer & Mobile Application Developer
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">🚀</span>
                  Robust Experience as Full Stack Developer & Mobile Application Developer
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Experience & Education */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2 space-y-12">
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
                {interests.map((interest) => (
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
      </motion.div>
    </div>
  );
};

export default About; 