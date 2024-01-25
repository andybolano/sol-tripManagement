import { httpClientLocal } from "@/remotes-config/shared-library/api-client"

import type { Trip } from "../interfaces/Trip"

const useTrip = () => {
	const getTrips = async (): Promise<Trip[]> => {
		return await httpClientLocal.get<Trip[]>("/trips")
	}

	const saveTrip = async (data: Trip): Promise<Trip> => {
		return await httpClientLocal.post<Trip, Trip>("/trips", data)
	}

	const getTripById = async (id: string): Promise<Trip> => {
		return await httpClientLocal.get<Trip>(`/trips/${id}`)
	}

	const updateTrip = async (id: string, data: Trip): Promise<Trip> => {
		return await httpClientLocal.patch<Trip, Trip>(`/trips/${id}`, data)
	}

	return {
		getTrips,
		saveTrip,
		getTripById,
		updateTrip,
	}
}

export default useTrip
