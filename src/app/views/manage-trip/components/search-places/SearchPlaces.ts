import useMap from "@/app/shared/composables/Map"
import { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"
import {
	SetupContext,
	computed,
	defineComponent,
	onMounted,
	ref,
	watch,
} from "vue"

export default defineComponent({
	name: "SearchPlaces",
	props: {
		placeName: {
			type: String,
			required: false,
		},
	},
	setup(props, { emit }: SetupContext) {
		const isLoadingPlaces = ref(false)
		const debounceTimeout = ref()
		const debouncedValue = ref("")
		const { getPlaces } = useMap()
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
			emit("placeSelected", place)
		}

		watch(
			() => props.placeName,
			(value): void => {
				searchTerm.value = value || ""
			}
		)

		return {
			handlePlaceSelected,
			searchTerm,
			places,
			isLoadingPlaces,
		}
	},
})
