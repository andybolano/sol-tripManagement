const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
	publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
	devServer: {
		hot: false,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	configureWebpack: {
		plugins: [
			new ModuleFederationPlugin({
				name: "tripManagement",
				filename: "remoteEntry.js",
				remotes: {
					sharedLibrary: `sharedLibrary@${process.env.VUE_APP_REMOTE_SHARED_LIBRARY}/remoteEntry.js`,
				},
				exposes: {
					"./TripList.vue": "./src/app/views/trip-list/TripList.vue",
					"./ManageTrip.vue":
						"./src/app/views/manage-trip/ManageTrip.vue",
					"./i18nModule": "./src/i18n/configI8n.ts",
					"./RouterTripManagement": "./src/router/index.ts",
				},
				shared: {
					vue: {
						eager: true,
						singleton: true,
						requiredVersion: "3.4.14",
					},
					"vue-router": {
						eager: true,
						singleton: true,
						requiredVersion: "4.2.5",
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
