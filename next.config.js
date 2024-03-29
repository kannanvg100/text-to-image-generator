/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'replicate.com',
			},
			{
				protocol: 'https',
				hostname: 'replicate.delivery',
			},
            {
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},
}

module.exports = nextConfig
