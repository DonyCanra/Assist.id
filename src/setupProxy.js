const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  //   const appDomain = process.env.REACT_APP_DOMAIN;
  const appDomain = "localhost";
  const proxyOptions = {
    target: `http://${appDomain}`,
    changeOrigin: true,
  };
  const urlPaths = ["*/dashboard"];
  urlPaths.forEach((url) => app.use(url, createProxyMiddleware(proxyOptions)));
};
