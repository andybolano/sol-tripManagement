const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
	publicPath: "http://localhost:8082",
	configureWebpack: {
		plugins: [
			new ModuleFederationPlugin({
				name: "tripManagement",
				filename: "remoteEntry.js",
				remotes: {
					uiLibrary: "uiLibrary@http://localhost:8081/remoteEntry.js",
				},
				exposes: {
					"./TripList.vue": "./src/app/views/trip-list/TripList.vue",
				},
				shared: {
					vue: {
						eager: true,
						singleton: true,
					},
				},
			}),
		],
		optimization: {
			splitChunks: false,
		},
	},
	chainWebpack: (config) => {
		config.resolve.extensions.add(".js").add(".vue").add(".json")

		config.module
			.rule("vue")
			.test(/\.vue$/)
			.use("vue-loader")
			.loader("vue-loader")
			.end()
	},
}
