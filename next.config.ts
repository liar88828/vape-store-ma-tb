import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,DELETE,PATCH,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		]
	},

	experimental: {
		// dynamicIO: true,
		serverActions: {
			bodySizeLimit: "2mb",
			allowedOrigins: [
				process.env.NEXT_PUBLIC_LOCAL as string,
				process.env.NEXT_PUBLIC_LOCAL_PORT as string,
				process.env.NEXT_PUBLIC_URL_PAGE_RAW as string,
				process.env.NEXT_PUBLIC_URL_API_RAW as string,
			],
		},
	},
	/* config options here */
}

export default nextConfig
