import { createProxyMiddleware } from 'http-proxy-middleware';

export default (targetApiUrl, proxyApiUrl, options = {}) => {
	const defaultOptions = {
		target: targetApiUrl,
		changeOrigin: true,
		ws: false,
		pathRewrite: {
			[`^${proxyApiUrl}`]: '' // remove base path
		},
		logLevel: 'debug'
	};

	const proxyOptions = {
		...defaultOptions,
		...options
	};

	return createProxyMiddleware(`${proxyApiUrl}`, proxyOptions);
};
