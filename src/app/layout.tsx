import React, {type ReactNode} from "react";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Metadata} from "next";
import MainLayout from "@/components/MainLayout";



export const metadata: Metadata = {
    title: {default: "NHRepon portfolio", template: "%s | NHRepon Portfolio"},
    description: "Mobile and Web Application Developer",
    keywords: "Flutter App Development, Web App Development , Mobile App Development, NHRepon, NHRepon Portfolio",
    openGraph: {
        title: "NHRepon Portfolio",
        description: "Mobile and Web Application Developer",
        url: "https://nhrepon.com",
        siteName: "NHRepon Portfolio",
        locale: "en-US",
        type: "website",
        images: [
            {
                url: "https://nhrepon.com/og.png",
                width: 800,
                height: 600
            }
        ],

    },
    metadataBase: new URL("https://nhrepon.com"),
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
        title: "siteMetadata.title",
        images: "[siteMetadata.socialBanner]",
      },

};

export default function RootLayout({children}: { children: ReactNode }) {


    return (
        <html lang="en">
        <body className="bg-gray-100 dark:bg-gray-900">
        <MainLayout>
            {children}
        </MainLayout>
        <Toaster position="top-center"/>
        </body>
        </html>
    );
}
