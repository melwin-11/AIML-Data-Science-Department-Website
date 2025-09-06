/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  images: {
    domains: [
      "i.ibb.co",
      "miro.medium.com",
      "static.wixstatic.com",
      "d1m75rqqgidzqn.cloudfront.net",
      "www.simplilearn.com",
      "cdn.analyticsvidhya.com",
      "www.appstud.com",
      "www.researchgate.net",
      "i.pravatar.cc",
      "kp.christuniversity.in"
    ],
  },
  eslint : { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
