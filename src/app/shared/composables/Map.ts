import { httpClientMapLocal } from "@/remotes-config/shared-library/api-client"
import type { MapboxPlaces } from "../interfaces/Mapbox"

const useMap = () => {
	const getPlaces = async (address: string): Promise<MapboxPlaces> => {
		return await httpClientMapLocal.get(
			`mapbox.places/${address}.json?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`
		)
	}

	return {
		getPlaces,
	}
}

export default useMap
