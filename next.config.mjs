/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_TOKEN: process.env.API_TOKEN,
      },
      compiler: {
        styledComponents: true,
      },
};

export default nextConfig;
