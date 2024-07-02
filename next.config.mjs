/** @type {import('next').NextConfig} */

import { config } from "dotenv";

const env = config().parsed;

const nextConfig = {
  env: {
    MONGODB_URI: env.MONGODB_URI,
  },
};

export default nextConfig;
