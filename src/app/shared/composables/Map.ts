import { httpClientMap } from "uiLibrary/apiClient"
import { MapboxPlaces } from "../interfaces/Mapbox"

const useMap = () => {
	//TODO: validate why 401
	const getPlaces = async (address: string): Promise<MapboxPlaces> => {
		return await httpClientMap.get(
			`mapbox.places/${address}.json?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`
		)
	}

	return {
		getPlaces,
	}
}

export default useMap
