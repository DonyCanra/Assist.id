const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Change this path to match your API endpoint
    createProxyMiddleware({
      target: "http://localhost:3030", // Change this to your API server's address
      changeOrigin: true,
    })
  );
};
