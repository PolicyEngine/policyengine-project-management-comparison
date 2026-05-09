/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mantine/core', '@mantine/hooks'],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
