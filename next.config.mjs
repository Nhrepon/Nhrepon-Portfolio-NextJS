/** @type {import('next').NextConfig} */

const nextConfig = {

    //output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: true,
    //swcMinify: true,
    
};

export default nextConfig;
