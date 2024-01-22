import { MapLocation } from "./Mapbox"

export interface Trip {
	id: string
	clientName: string
	address: {
		name: string
		location: MapLocation
	}
	departureDate: string
	cargoDetails: string
}
