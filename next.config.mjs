//import path from "node:path";
import { fileURLToPath } from "node:url";

// Get directory name equivalent
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const nextConfig = {
    output: "standalone",
    experimental: {
        //outputFileTracingRoot: path.join(__dirname, '../../'),
        outputFileTracingExcludes: {
            '*': [
                'node_modules/**/*',
                '!node_modules/.pnpm/**/*'
            ]
        }
    }
};


/** @type {import('next').NextConfig} */

// const nextConfig = {
//
//     output: "standalone",
//     // images: {
//     //     remotePatterns: [
//     //         {
//     //             protocol: "https",
//     //             hostname: "**",
//     //         },
//     //     ],
//     // },
// };

export default nextConfig;
