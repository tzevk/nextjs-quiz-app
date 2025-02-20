/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Ensures correct deployment behavior
    trailingSlash: false, // Important for correct routing
  };
export default nextConfig;
