import { Ref, computed, defineComponent, onMounted, ref } from "vue"
import type { Trip } from "@/app/shared/interfaces/Trip"
import useTrip from "@/app/shared/composables/Trip"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { toastMessage } from "@/remotes-config/shared-library/components"
import { useLoading } from "@/remotes-config/shared-library/composables"
import { tripEmpty } from "./const/tripEmpty"
import TripForm from "./components/trip-form/TripForm.vue"
import { EmitTripFormData } from "./components/trip-form/interfaces/EmitTripFormData"

function useEditTrip() {
	const { t } = useI18n()
	const { getTripById, updateTrip } = useTrip()
	const { startLoading, stopLoading } = useLoading()
	const route = useRoute()
	const idTrip: string = route.params.id as string
	const isEditTrip: Ref<boolean> = computed(() => !!idTrip)

	const getTripToEdit = async (idTrip: string): Promise<Trip | void> => {
		try {
			startLoading()
			const tripResponse: Trip = await getTripById(idTrip)
			return tripResponse
		} catch (err) {
			toastMessage.error(err)
		} finally {
			stopLoading()
		}
	}

	const saveChanges = async (trip: Trip): Promise<void> => {
		try {
			startLoading()
			await updateTrip(trip.id, trip)
			toastMessage.success(t("Trip successfully updated"))
		} catch (err) {
			toastMessage.error(err)
		} finally {
			stopLoading()
		}
	}

	return {
		getTripToEdit,
		isEditTrip,
		saveChanges,
		idTrip,
	}
}

function useCreateTrip() {
	const { t } = useI18n()
	const { startLoading, stopLoading } = useLoading()
	const { createNewTrip } = useTrip()

	const createTrip = async (trip: Trip): Promise<void> => {
		try {
			startLoading()
			await createNewTrip(trip)
			toastMessage.success(t("Trip successfully created"))
		} catch (err) {
			toastMessage.error(err)
		} finally {
			stopLoading()
		}
	}

	return {
		createTrip,
	}
}

export default defineComponent({
	name: "ManageTrip",
	components: {
		TripForm,
	},
	setup() {
		const { t } = useI18n()
		const router = useRouter()
		const trip = ref<Trip>({ ...tripEmpty })
		const tripFormRef = ref()
		const isFormValid = ref(false)

		const { isEditTrip, getTripToEdit, saveChanges, idTrip } = useEditTrip()
		const { createTrip } = useCreateTrip()

		const createNewTrip = async () => {
			await createTrip(trip.value)
			tripFormRef.value.resetForm()
		}

		const titlePage = computed(() =>
			isEditTrip.value
				? `${t("Edit Trip")} : ${trip.value.id}`
				: t("Create new trip")
		)

		const uploadFormInformation = (data: EmitTripFormData): void => {
			trip.value = data.formValue
			isFormValid.value = data.isValid
		}

		const cancel = (): void => {
			tripFormRef.value.resetForm()
			router.back()
		}

		onMounted(async () => {
			if (isEditTrip.value) {
				trip.value = (await getTripToEdit(idTrip)) || { ...tripEmpty }
			}
		})

		return {
			createNewTrip,
			isEditTrip,
			saveChanges,
			titlePage,
			cancel,
			tripFormRef,
			uploadFormInformation,
			trip,
			isFormValid,
		}
	},
})
