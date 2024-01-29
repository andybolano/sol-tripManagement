import { httpClientLocal } from "@/remotes-config/shared-library/api-client"
import type { Trip } from "../interfaces/Trip"
import { toastMessage } from "@/remotes-config/shared-library/components"
import { useLoading } from "@/remotes-config/shared-library/composables"

const useTrip = () => {
	const { startLoading, stopLoading } = useLoading()

	const getTrips = async (): Promise<Trip[]> => {
		try {
			startLoading()
			return await apiGetTrips()
		} catch (err) {
			toastMessage.error(err)
			return []
		} finally {
			stopLoading()
		}
	}

	const apiGetTrips = async (): Promise<Trip[]> => {
		return await httpClientLocal.get<Trip[]>("/trips")
	}

	const createNewTrip = async (data: Trip): Promise<Trip> => {
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
		createNewTrip,
		getTripById,
		updateTrip,
	}
}

export default useTrip
