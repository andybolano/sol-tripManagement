import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/trip/list",
		name: "trip-list",
		component: () =>
			import(
				/* webpackChunkName: "TripList" */ "../app/views/trip-list/TripList.vue"
			),
	},
	{
		path: "/trip/management/:id?",
		name: "trip-management",
		component: () =>
			import(
				/* webpackChunkName: "TripList" */ "../app/views/manage-trip/ManageTrip.vue"
			),
	},
	{
		path: "/",
		redirect: { name: "trip-list" },
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
