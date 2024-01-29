import { SetupContext, defineComponent, ref, watch, watchEffect } from "vue"
import { tripEmpty } from "../../const/tripEmpty"
import { Trip } from "@/app/shared/interfaces/Trip"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { ItemPlaceSearchList } from "@/app/shared/interfaces/ItemPlaceSearchList"
import SearchPlaces from "../search-places/SearchPlaces.vue"
import { EmitTripFormData } from "./interfaces/EmitTripFormData"

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
		watchEffect(() => {
			props.initialData &&
				Object.assign(tripForm.value, props.initialData)
		})

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
		watch(
			() => validate$.value,
			(newValue, oldValue): void => {
				if (newValue.$invalid === oldValue.$invalid) {
					return
				}
				handleSubmit()
			}
		)

		const handleSubmit = (): void => {
			emit("formData", {
				formValue: tripForm.value,
				isValid: !validate$.value.$invalid,
			} as EmitTripFormData)
		}

		const handlePlaceSelected = (place: ItemPlaceSearchList): void => {
			tripForm.value.address = place
		}

		const resetForm = (): void => {
			tripForm.value = { ...tripEmpty }
			tripForm.value.address.name = ""
			validate$.value.$reset()
		}
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
