import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: {
		buildActivity: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.spoonacular.com",
				pathname: "/recipes/**",
			},
		],
	},
};

export default nextConfig;
