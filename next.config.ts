import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/style')],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'https://s3-eu-west-1.amazonaws.com/manualco',
        pathname: '/a/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
