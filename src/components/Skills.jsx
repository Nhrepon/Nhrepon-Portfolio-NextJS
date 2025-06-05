"use client";
import { motion } from "framer-motion";
const SkillList = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skills = [
    {
      id: 1,
      title: "Flutter",
      description: "Flutter",
      image: "/flutter.svg",
    },
    {
      id: 2,
      title: "React",
      description: "React",
      image: "/react.svg",
    },
    {
      id: 3,
      title: "NextJs",
      description: "NextJs",
      image: "/next.svg",
    },
    {
      id: 4,
      title: "DotNet",
      description: "DotNet",
      image: "/dotnet.svg",
    },
    {
      id: 5,
      title: "Laravel",
      description: "Laravel",
      image: "/laravel.svg",
    },
    {
      id: 6,
      title: "Node.js",
      description: "Node.js",
      image: "/node.svg",
    },
    {
      id: 7,
      title: "PHP",
      description: "PHP",
      image: "/php.svg",
    },
    {
      id: 8,
      title: "MongoDB",
      description: "MongoDB",
      image: "/mongodb.svg",
    },
    {
      id: 9,
      title: "TypeScript",
      description: "TypeScript",
      image: "/typescript.svg",
    },
    {
      id: 10,
      title: "Dart",
      description: "Dart",
      image: "/dart.svg",
    },
    {
      id: 11,
      title: "ExpressJs",
      description: "ExpressJs",
      image: "/express.svg",
    },
    {
      id: 12,
      title: "MySQL",
      description: "MySQL",
      image: "/mysql.svg",
    },
  ];
  // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full">
      <div className="max-w-7xl mx-auto py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a
            specific problem or explore new technologies.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-6 gap-4">
          {skills.map((skill) => (
            <div
              className="flex flex-col items-center p-2 shadow-md border-1 border-gray-300 rounded bg-linear-to-r from-green-200 to-indigo-100 relative"
              key={skill.id}
            >
              <img className="w-3/4 h-3/4" src={skill.image} />
              <p className="py-2 text-1xl font-bold">{skill.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillList;
