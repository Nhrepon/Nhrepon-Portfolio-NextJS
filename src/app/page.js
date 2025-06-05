import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SkillList from "@/components/skills";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center w-full">
        <Hero />
        <SkillList/>
        <Projects />
      </main>
    </div>
  );
}
