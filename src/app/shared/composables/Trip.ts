import { httpClient } from "sharedLibrary/apiClient"
import type { Trip } from "../interfaces/Trip"

const useTrip = () => {
	const getTrips = async (): Promise<Trip[]> => {
		return await httpClient.get("/trips") //TODO add types <>
	}

	const saveTrip = async (data: Trip): Promise<Trip> => {
		return await httpClient.post("/trip", data) //TODO add types <>
	}

	const getTripById = async (id: string): Promise<Trip> => {
		return await httpClient.get(`/trip/${id}`)
	}

	const updateTrip = async (id: string, data: Trip): Promise<Trip> => {
		return await httpClient.patch(`/trip/${id}`, data)
	}

	return {
		getTrips,
		saveTrip,
		getTripById,
		updateTrip,
	}
}

export default useTrip
