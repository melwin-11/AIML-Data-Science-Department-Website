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
      "i.pravatar.cc"
      // add any other external domains you use for images
    ],
  },
};

module.exports = nextConfig;
