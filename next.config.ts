import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "mintram",
            value: "mintraminthemiddle",
          },
          {
            key: "x-another-custom-header",
            value: "my other custom header value",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["imagedelivery.net"],
  },
  //output: "export",
};

export default nextConfig;
