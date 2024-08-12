/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, 
      },
    experimental: {
        appDir: false,
      },
};

export default nextConfig;
