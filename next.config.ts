import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const isBuild = process.env.npm_lifecycle_event === 'build';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: isBuild && process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		// Allows loading images from different domains until we add the feature to save images on the server
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: '',
				search: '',
			},
		],
	},
	compress: true,
};

export default bundleAnalyzer(nextConfig);
