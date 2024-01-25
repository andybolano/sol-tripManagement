import { Ref, computed, defineComponent, onMounted, ref } from "vue"
import type { Trip } from "@/app/shared/interfaces/Trip"
import useTrip from "@/app/shared/composables/Trip"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { toastMessage } from "@/remotes-config/shared-library/components"
import { useLoading } from "@/remotes-config/shared-library/composables"
import { tripEmpty } from "./const/tripEmpty"
import TripForm from "./components/trip-form/TripForm.vue"

export default defineComponent({
	name: "ManageTrip",
	components: {
		TripForm,
	},
	setup() {
		const { t } = useI18n()
		const { saveTrip, getTripById, updateTrip } = useTrip()
		const { startLoading, stopLoading } = useLoading()
		const route = useRoute()
		const router = useRouter()
		const tripFormRef = ref()
		const isFormValid = ref(false)
		const isEditTrip: Ref<boolean> = computed(() => !!route.params.id)
		const trip = ref<Trip>({ ...tripEmpty })
		const titlePage = computed(() =>
			isEditTrip.value
				? `${t("Edit Trip")} : ${trip.value.id}`
				: t("Create new trip")
		)
		const idTrip: string = route.params.id as string

		const createTrip = async (): Promise<void> => {
			try {
				startLoading()
				await saveTrip(trip.value)
				toastMessage.success(t("Trip successfully created"))
				tripFormRef.value.resetForm()
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const saveChanges = async (): Promise<void> => {
			try {
				startLoading()
				await updateTrip(trip.value.id, trip.value)
				toastMessage.success(t("Trip successfully updated"))
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const getTrip = async (idTrip: string): Promise<void> => {
			try {
				startLoading()
				const tripResponse: Trip = await getTripById(idTrip)
				trip.value = tripResponse
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const setDataForm = ({
			data,
			isValid,
		}: {
			data: Trip
			isValid: boolean
		}): void => {
			trip.value = data
			isFormValid.value = isValid
		}

		const cancel = (): void => {
			tripFormRef.value.resetForm()
			router.back()
		}

		onMounted(() => {
			if (isEditTrip.value) {
				getTrip(idTrip)
			}
		})

		return {
			createTrip,
			isEditTrip,
			saveChanges,
			titlePage,
			cancel,
			tripFormRef,
			setDataForm,
			trip,
			isFormValid,
		}
	},
})
