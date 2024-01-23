import { useI18n } from "vue-i18n"
import useTrip from "@/app/shared/composables/Trip"
import type { Trip } from "@/app/shared/interfaces/Trip"
import { defineComponent, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useLoading } from "sharedLibrary/useLoading"
import { toastMessage } from "@/app/shared/utils/toastMessages"

export default defineComponent({
	name: "TripList",

	setup() {
		const { startLoading, stopLoading } = useLoading()
		const { t } = useI18n()
		const { getTrips } = useTrip()
		const router = useRouter()
		const listTrips = ref<Trip[]>([])

		const goToCreateNew = (): void => {
			router.push({ name: "trip-management" })
		}

		const getAllTrips = async (): Promise<void> => {
			try {
				startLoading()
				const response = await getTrips()
				listTrips.value = response
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const showEdit = (tripId: string): void => {
			router.push({ name: "trip-management", params: { id: tripId } })
		}

		onMounted(() => {
			getAllTrips()
		})

		return {
			goToCreateNew,
			showEdit,
			listTrips,
			columns: [
				{
					title: t("Client Name"),
					dataIndex: "clientName",
					key: "clientName",
				},
				{
					title: t("Address"),
					dataIndex: "address.name",
					key: "address",
				},
				{
					title: t("Departure Date"),
					dataIndex: "departureDate",
					key: "departureDate",
				},
				{
					title: t("Created At"),
					dataIndex: "createdAt",
					key: "createdAt",
				},
				{
					title: "",
					key: "action",
				},
			],
		}
	},
})
