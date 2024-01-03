/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
	headers: () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "Cache-Control",
					value: "no-store",
				},
			],
		},
	],
};
