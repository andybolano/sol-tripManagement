import { MapLocation } from "./Mapbox"

export interface TripForm {
	clientName: string
	address: {
		name: string
		location: MapLocation
	}
	departureDate: string
	cargoDetails: string
}
