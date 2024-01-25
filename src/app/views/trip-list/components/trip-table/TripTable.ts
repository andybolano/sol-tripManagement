import { columns } from "./const/columns"
import { SetupContext, defineComponent } from "vue"
import { Trip } from "@/app/shared/interfaces/Trip"

export default defineComponent({
	name: "TripTable",
	props: {
		list: {
			type: Array as () => Trip[],
		},
	},

	setup(_, { emit }: SetupContext) {
		const goToEdit = (tripId: string) => {
			emit("edit", tripId)
		}

		return {
			goToEdit,
			columns: columns(),
		}
	},
})
