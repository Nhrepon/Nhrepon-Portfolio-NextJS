import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import SkillList from "@/components/home/Skills";
import Blogs from "@/components/home/Blogs";

export default function Home() {

    return (
        <div className="grid grid-rows-1 bg-gray-200 items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col row-start-2 items-center w-full">
                <Hero/>
                <SkillList/>
                <Projects/>
                <Blogs/>
            </div>
        </div>
    );
}
