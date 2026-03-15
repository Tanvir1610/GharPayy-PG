/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Next.js 16: Turbopack is default for both dev and build.
  // If you have issues with custom webpack config, use: next build --webpack
  experimental: {
    // React Compiler (optional, improves performance)
    // reactCompiler: true,
  },
};

export default nextConfig;
