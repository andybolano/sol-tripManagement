import { SetupContext, defineComponent, ref, watch } from "vue"
import { tripEmpty } from "../../const/tripEmpty"
import { Trip } from "@/app/shared/interfaces/Trip"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"
import SearchPlaces from "../search-places/SearchPlaces.vue"

export default defineComponent({
	name: "TripForm",
	components: {
		SearchPlaces,
	},
	props: {
		initialData: {
			type: Object as () => Trip,
			required: false,
		},
	},
	setup(props, { emit, expose }: SetupContext) {
		const tripForm = ref({ ...tripEmpty })

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

		const handlePlaceSelected = (place: ItemPlaceSearchList): void => {
			tripForm.value.address = place
		}

		const resetForm = (): void => {
			tripForm.value = { ...tripEmpty }
			validate$.value.$reset()
		}

		const handleSubmit = (): void => {
			emit("formData", {
				data: tripForm.value,
				isValid: !validate$.value.$invalid,
			})
		}

		watch(
			() => validate$.value,
			(newValue, oldValue): void => {
				if (newValue.$invalid === oldValue.$invalid) {
					return
				}
				handleSubmit()
			}
		)

		watch(
			() => props.initialData,
			(value): void => {
				value && Object.assign(tripForm.value, value)
			}
		)

		expose({
			resetForm,
		})

		return {
			tripForm,
			validate$,
			handlePlaceSelected,
		}
	},
})
