import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import SkillList from "@/components/home/Skills";
import Blogs from "@/components/home/Blogs";


export const generateMetadata = async () => {
    return {
        title: "NHRepon - Portfolio",
        description: "Mobile and Web Application Developer with 5+ years of experience in Flutter App Development and Web Application Development",
        keywords: "Flutter App Development, Web App Development , Mobile App Development, NHRepon, NHRepon Portfolio",
        authors: [{name: "NHRepon", url: "https://nhrepon.com"}],
        creator: "NHRepon",
        publisher: "NHRepon",
        icons:"/flutter.svg",
        robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              noimageindex: true,
              "max-video-preview": -1,
              "max-image-preview": "large",
              "max-snippet": -1,
            },
          },
          twitter: {
            card: "summary_large_image",
            title: "NHRepon - Portfolio",
            images: "https://nhrepon.com/og.png",
          },
          openGraph: {
            title: "NHRepon - Portfolio",
            description: "Mobile and Web Application Developer with 5+ years of experience in Flutter App Development and Web Application Development",
            type: "website",
            siteName: "NHRepon - Portfolio",
            locale: "en-BD",
            images: [
                {
                    url: "https://nhrepon.com/og.png",
                    width: 800,
                    height: 600
                }
            ],

        },
    };
};
export default function Home() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "NHRepon",
        "url": "https://nhrepon.com/",
        "sameAs": [
          "https://twitter.com/nhrepon",
          "https://www.linkedin.com/in/nhrepon"
        ],
        "jobTitle": "Mobile and Web Application Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "NHRepon"
        }
      };

    return (
        <div className="grid grid-rows-1 bg-gray-200 items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col row-start-2 items-center w-full">
                <Hero/>
                <SkillList/>
                <Projects/>
                <Blogs/>
            </div>
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </div>
    );
}
