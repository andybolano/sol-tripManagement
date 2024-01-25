import { defineComponent, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import TripTable from "./components/trip-table/TripTable.vue"
import type { Trip } from "@/app/shared/interfaces/Trip"
import useTrip from "@/app/shared/composables/Trip"

export default defineComponent({
	name: "TripList",
	components: {
		TripTable,
	},
	setup() {
		const { getTrips } = useTrip()
		const router = useRouter()
		const listTrips = ref<Trip[]>([])

		const getAllTrips = async (): Promise<void> => {
			listTrips.value = await getTrips()
		}

		const showEdit = (tripId: string): void => {
			router.push({ name: "trip-management", params: { id: tripId } })
		}

		const goToCreateNew = (): void => {
			router.push({ name: "trip-management" })
		}

		onMounted(() => {
			getAllTrips()
		})

		return {
			goToCreateNew,
			showEdit,
			listTrips,
		}
	},
})
