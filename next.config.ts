import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Handle Node.js modules in the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        'worker_threads': false,
        'node:assert': false,
        'node:async_hooks': false,
        'node:buffer': false,
        'node:console': false,
        'node:constants': false,
        'node:crypto': false,
        'node:dgram': false,
        'node:dns': false,
        'node:domain': false,
        'node:events': false,
        'node:fs': false,
        'node:http': false,
        'node:https': false,
        'node:net': false,
        'node:os': false,
        'node:path': false,
        'node:perf_hooks': false,
        'node:punycode': false,
        'node:querystring': false,
        'node:readline': false,
        'node:repl': false,
        'node:stream': false,
        'node:string_decoder': false,
        'node:timers': false,
        'node:tls': false,
        'node:tty': false,
        'node:url': false,
        'node:util': false,
        'node:v8': false,
        'node:vm': false,
        'node:zlib': false,
      };
    }

    return config;
  },
  serverExternalPackages: ['payload'],
};

export default nextConfig;
