import type { Trip } from "@/app/shared/interfaces/Trip"

export const tripEmpty: Trip = {
	id: "",
	clientName: "",
	address: {
		name: "",
		location: {
			lat: 0,
			lng: 0,
		},
	},
	departureDate: "",
	cargoDetails: "",
}
