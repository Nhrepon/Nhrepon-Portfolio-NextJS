"use client";
import { motion } from "framer-motion";
import {containerVariants, itemVariants} from "@/utility/motion";
import skillState from "@/state/skillState";
import {useEffect} from "react";
import Image from "next/image";

const SkillList = () => {

  const {skillList, fetchSkills} = skillState();

  useEffect(() => {
    (async ()=>{await fetchSkills(0, 12);})()
  }, []);

  return (
    <section className="bg-gradient-to-b from-indigo-200 to-gray-200 dark:from-gray-900 dark:to-gray-800 w-full">
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

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {skillList.map((skill) => (
            <div
              className="flex flex-col items-center justify-between p-2 shadow-md border-1 border-gray-300 rounded bg-linear-to-r from-green-200 to-indigo-100 relative hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out cursor-pointer"
              key={skill._id}
            >
              <Image className="w-4/5 h-4/5 object-contain" src={skill.image} alt={skill.title} title={skill.title} width={1280} height={720} loading="lazy" placeholder="blur" blurDataURL={skill.image} />
              <p className="py-2 text-md font-semibold">{skill.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillList;
