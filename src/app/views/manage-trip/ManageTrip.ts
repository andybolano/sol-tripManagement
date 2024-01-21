import { Ref, computed, defineComponent, ref } from "vue"
import CusMap from "uiLibrary/CusMap.vue"
import CusSearch from "uiLibrary/CusSearch.vue"
import useMap from "@/app/shared/composables/Map"
import { TripForm } from "@/app/shared/interfaces/TripForm"
import { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"

export default defineComponent({
	name: "ManageTrip",
	components: {
		CusMap,
		CusSearch,
	},
	setup() {
		const { getPlaces } = useMap()
		const isLoadingPlaces = ref(false)
		const debounceTimeout = ref()
		const debouncedValue = ref("")

		const tripForm: Ref<TripForm> = ref({
			clientName: "",
			address: "",
			departureDate: "",
			cargoDetails: "",
		})

		const places = ref<ItemPlaceSearchList[]>([])
		const placeSelected = ref<ItemPlaceSearchList>()

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
			} catch (err: any) {
				console.log(err)
				//TODO show error
			} finally {
				isLoadingPlaces.value = false
			}
		}

		const handlePlaceSelected = (place: ItemPlaceSearchList): void => {
			placeSelected.value = place
			tripForm.value.address = place.name
		}

		return {
			tripForm,
			searchTerm,
			isLoadingPlaces,
			places,
			placeSelected,
			handlePlaceSelected,
		}
	},
})
