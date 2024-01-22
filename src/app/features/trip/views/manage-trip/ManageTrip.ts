import { Ref, computed, defineComponent, onMounted, ref } from "vue"
import CusMap from "sharedLibrary/CusMap.vue"
import CusSearch from "sharedLibrary/CusSearch.vue"
import useMap from "@/app/shared/composables/Map"
import type { Trip } from "@/app/shared/interfaces/Trip"
import type { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"
import useTrip from "@/app/shared/composables/Trip"
import { tripEmpty } from "./const/tripEmpty"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { toastMessage } from "@/app/shared/utils/toastMessages"
import { useLoading } from "sharedLibrary/useLoading"

export default defineComponent({
	name: "ManageTrip",
	components: {
		CusMap,
		CusSearch,
	},
	setup() {
		const { t } = useI18n()
		const { getPlaces } = useMap()
		const { saveTrip, getTripById, updateTrip } = useTrip()
		const { startLoading, stopLoading } = useLoading()
		const route = useRoute()
		const router = useRouter()

		const isLoadingPlaces = ref(false)
		const debounceTimeout = ref()
		const debouncedValue = ref("")
		const tripForm = ref<Trip>({ ...tripEmpty })

		const rules = {
			clientName: { required },
			address: {
				name: { required },
				location: {
					lat: { required },
					lng: { required },
				},
			},
			departureDate: { required },
		}

		const validate$ = useVuelidate(rules, tripForm)

		const places = ref<ItemPlaceSearchList[]>([])

		const searchTerm = computed({
			get() {
				return debouncedValue.value
			},
			set(val: string) {
				if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

				debounceTimeout.value = setTimeout(() => {
					debouncedValue.value = val
					getPlacesByAddress(val)
				}, 500)
			},
		})

		const isEditTrip: Ref<boolean> = computed(() => !!route.params.id)
		const titlePage = computed(() =>
			isEditTrip.value
				? `${t("Edit Trip")} : ${tripForm.value.id}`
				: t("Create new trip")
		)
		const idTrip: string = route.params.id as string

		//TODO improve this composable, why ??
		const getPlacesByAddress = async (val: string): Promise<void> => {
			try {
				isLoadingPlaces.value = true
				const response = await getPlaces(val)
				places.value = response.features.map((item) => ({
					id: item.id,
					name: item.place_name,
					location: {
						lng: item.center[0],
						lat: item.center[1],
					},
				}))
			} catch (err) {
				console.log(err)
			} finally {
				isLoadingPlaces.value = false
			}
		}

		const handlePlaceSelected = (place: ItemPlaceSearchList): void => {
			tripForm.value.address = place
		}

		const createTrip = async (): Promise<void> => {
			try {
				startLoading()
				await saveTrip(tripForm.value)
				toastMessage.success(t("Trip successfully created"))
				resetForm()
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const resetForm = (): void => {
			tripForm.value = { ...tripEmpty }
			validate$.value.$reset()
			searchTerm.value = ""
		}

		const saveChanges = async (): Promise<void> => {
			try {
				startLoading()
				await updateTrip(tripForm.value.id, tripForm.value)
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
				const trip: Trip = await getTripById(idTrip)
				tripForm.value = trip
				searchTerm.value = trip.address.name
			} catch (err) {
				toastMessage.error(err)
			} finally {
				stopLoading()
			}
		}

		const cancel = (): void => {
			resetForm()
			router.back()
		}

		onMounted(() => {
			if (isEditTrip.value) {
				getTrip(idTrip)
			}
		})

		return {
			tripForm,
			searchTerm,
			isLoadingPlaces,
			places,
			handlePlaceSelected,
			createTrip,
			isEditTrip,
			saveChanges,
			titlePage,
			cancel,
			validate$,
		}
	},
})
