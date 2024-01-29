import { httpClientMapLocal } from "@/remotes-config/shared-library/api-client"
import type { MapboxPlaces } from "../interfaces/Mapbox"
import PlacesModel from "../clasess/PlacesModel"
import { ItemPlaceSearchList } from "../interfaces/ItemPlaceSearchList"

let placesModel: PlacesModel | null = null

const useMap = () => {
	const getPlaces = async (address: string): Promise<void> => {
		const response = await getPlacesApi(address)
		placesModel = new PlacesModel(response)
	}

	const getPlacesSearchList = (): ItemPlaceSearchList[] => {
		return placesModel ? placesModel.getFeatureSearchList() : []
	}

	const getPlacesApi = async (address: string): Promise<MapboxPlaces> => {
		return await httpClientMapLocal.get<MapboxPlaces>(
			`mapbox.places/${address}.json?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`
		)
	}

	return {
		getPlaces,
		getPlacesSearchList,
	}
}

export default useMap
