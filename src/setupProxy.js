const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * CRA dev-server proxy: forwards /api/twitter/* → https://api.twitter.com/*
 * so the browser never hits Twitter directly (avoids CORS block).
 * The Bearer token is injected server-side so it never leaks to the client.
 */
module.exports = function (app) {
  app.use(
    '/api/twitter',
    createProxyMiddleware({
      target: 'https://api.twitter.com',
      changeOrigin: true,
      pathRewrite: { '^/api/twitter': '' },
      on: {
        proxyReq: (proxyReq) => {
          proxyReq.setHeader(
            'Authorization',
            `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`
          );
        },
      },
    })
  );
};
