import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const response = await fetch(`/api/blog?slug=${params.slug}`);
    const data = await response.json();
    const blog = data.data;

    if (!blog) {
        return {
            title: {
                absolute: "Blog Not Found",
                template: `%s | NHRepon Blog`
            },
            description: "The requested blog post could not be found",
            keywords: "blog, article, reading",
            authors: [
                {
                    name: "NHRepon",
                    url: "https://nhrepon.com"
                }
            ],
            creator: "NHRepon",
            publisher: "NHRepon",
            icons: {
                icon: "/favicon.ico",
                apple: "/apple-touch-icon.png"
            },
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
                }
            },
            openGraph: {
                title: "Blog Not Found",
                description: "The requested blog post could not be found",
                type: "article",
                images: [],
                siteName: "NHRepon Blog",
                locale: "en_US",
            },
            twitter: {
                card: "summary_large_image",
                title: "Blog Not Found",
                description: "The requested blog post could not be found",
                images: [],
                creator: "@NHRepon",
                site: "@NHRepon"
            }
        };
    }

    const metadata: Metadata = {
        title: {
            absolute: blog.title,
            template: `%s | NHRepon Blog`
        },
        description: blog.description || "Read this blog post on our website",
        keywords: blog.tags?.join(", ") || "blog, article, reading",
        authors: [
            {
                name: blog.author?.[0]?.userName || "NHRepon",
                url: "https://nhrepon.com"
            }
        ],
        creator: blog.author?.[0]?.userName || "NHRepon",
        publisher: "NHRepon",
        icons: {
            icon: "/favicon.ico",
            apple: "/apple-touch-icon.png"
        },
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
            }
        },
        openGraph: {
            title: blog.title,
            description: blog.description || "Read this blog post on our website",
            type: "article",
            images: [
                {
                    url: blog.image,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                }
            ],
            siteName: "NHRepon Blog",
            locale: "en_US",
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.description || "Read this blog post on our website",
            images: [blog.image],
            creator: blog.author?.[0]?.userName || "@NHRepon",
            site: "@NHRepon"
        }
    };

    return metadata;
}
