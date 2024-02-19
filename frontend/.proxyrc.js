const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
      // @todo
      // verify proxy locally!!
      createProxyMiddleware("/api", {
        target: `http://${process.env.BACKEND_URL || 'localhost:3000'}/`,
        pathRewrite: {
          "^/api": "",
        },
      })
  );
};