const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../../webpack.dev");

const server = new WebpackDevServer(
  { host: "127.0.0.1", port: 9000 },
  webpack(config),
);

(async () => {
  await server.start();

  console.log("Running");
})();
