import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);

const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        outputFileTracingExcludes: {
            '*': [
                'node_modules/**/*',
                '!node_modules/.pnpm/**/*'
            ]
        }
    }, 
};

export default nextConfig;
