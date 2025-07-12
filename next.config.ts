import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const isBuild = process.env.npm_lifecycle_event === 'build';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: isBuild && process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
};

export default bundleAnalyzer(nextConfig);
