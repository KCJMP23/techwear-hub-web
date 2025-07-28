import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Provide fallbacks for Node.js modules in the browser
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
        util: false,
        buffer: false,
        process: false,
      };
    }

    // Handle amazon-paapi package
    config.resolve.alias = {
      ...config.resolve.alias,
      'ApiClient': false,
      'api/DefaultApi': false,
      'model/Availability': false,
      'model/BrowseNode': false,
      'model/BrowseNodeAncestor': false,
    };

    return config;
  },
  // Server external packages for Payload CMS
  serverExternalPackages: ['payload'],
};

export default nextConfig;
