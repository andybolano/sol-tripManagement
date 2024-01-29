import useMap from "@/app/shared/composables/Map"
import { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"
import {
	SetupContext,
	computed,
	defineComponent,
	onBeforeUnmount,
	ref,
} from "vue"
import PlacesModel from "@/app/shared/clasess/PlacesModel"

const delaySearch = 500

export default defineComponent({
	name: "SearchPlaces",
	props: {
		modelValue: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }: SetupContext) {
		const isLoadingPlaces = ref(false)
		const debounceTimeout = ref()
		const { getPlaces } = useMap()
		const places = ref<ItemPlaceSearchList[]>([])

		const searchTerm = computed({
			get() {
				return props.modelValue
			},
			set(value: string) {
				if (debounceTimeout.value) clearTimeout(debounceTimeout.value)
				debounceTimeout.value = setTimeout(() => {
					getPlacesByAddress(value)
					emit("update:modelValue", value)
				}, delaySearch)
			},
		})

		const getPlacesByAddress = async (val: string): Promise<void> => {
			try {
				isLoadingPlaces.value = true
				const response = await getPlaces(val)
				const placesModel = new PlacesModel(response)
				places.value = placesModel.getFeatureSearchList()
			} catch (err) {
				console.log(err)
			} finally {
				isLoadingPlaces.value = false
			}
		}

		const handlePlaceSelected = (place: ItemPlaceSearchList): void => {
			places.value = []
			emit("placeSelected", place)
		}

		onBeforeUnmount(() => {
			clearTimeout(debounceTimeout.value)
		})

		return {
			handlePlaceSelected,
			searchTerm,
			places,
			isLoadingPlaces,
		}
	},
})
