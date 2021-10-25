const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;

module.exports = {
	pluginOptions: {
		"style-resources-loader": {
			preProcessor: "scss",
			patterns: [path.resolve(__dirname, "./src/styles/global.scss")],
		},
	},
	configureWebpack: (config) => {
		if (process.env.NODE_ENV !== "production") {
			config.devServer = {
				host: "cognitivefunctiontask.local",
				https: {
					key: fs.readFileSync("./cognitivefunctiontask.local.key"),
					cert: fs.readFileSync("./cognitivefunctiontask.local.crt"),
				},
			};
		}
		return {
			plugins: [
				new webpack.DefinePlugin({
					"process.env": {
						APPLICATION_VERSION: '"' + version + '"',
					},
				}),
			],
		};
	},
};
