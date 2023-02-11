/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

const nextConfig = {
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["via.placeholder.com", "cdn.wallpaperhub.app"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
                port: "",
            },
            {
                protocol: "https",
                hostname: "www.wga.hu",
                port: "",
            },
        ],
    },
    output: "standalone",
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

module.exports = withPWA({ ...nextConfig });
