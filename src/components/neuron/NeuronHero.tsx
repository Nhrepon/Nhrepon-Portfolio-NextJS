"use client"
import {motion} from "framer-motion";
import React from 'react';
import {containerVariants, itemVariants} from "@/utility/motion";
import Link from "next/link";

const NeuronHero = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-[600px] bg-gradient-to-b from-purple-800 to-pink-700">
            <motion.div variants={containerVariants} initial="hidden" animate="visible"
                        className="flex flex-col gap-6 justify-center items-center">
                <motion.h2 variants={itemVariants} className="text-6xl text-white font-bold animate-pulse">
                    Welcome to the Neuron!
                </motion.h2>
                <motion.h3 variants={itemVariants} className="text-5xl text-yellow-500 font-bold">
                    Recharge your Brain!
                </motion.h3>
                <p>Neuron is a jljds [a;f afa f;afla f;fk asslafass lfjsoajpoafi; dflf ass;jlfjsd</p>
                <button className="bg-gradient-to-br from-yellow-300 to-pink-500 py-3 px-6 rounded shadow-lg text-black font-bold animate-pulse"><Link href="#">Start Now</Link> </button>
            </motion.div>
        </div>
    );
};

export default NeuronHero;