import { ItemPlaceSearchList } from "../interfaces/ItemPlaceSearchList"
import { MapBoxFeature, MapboxPlaces } from "../interfaces/Mapbox"

export default class PlacesModel implements MapboxPlaces {
	type: string
	query: string[]
	features: MapBoxFeature[]
	attribution: string

	constructor(places: MapboxPlaces) {
		this.type = places.type
		this.query = places.query
		this.attribution = places.attribution
		this.features = places.features
	}

	public getFeatureSearchList(): ItemPlaceSearchList[] {
		return this.features.map((item) => ({
			id: item.id,
			name: item.place_name,
			location: {
				lng: item.center[0],
				lat: item.center[1],
			},
		}))
	}

	public getCountPlaces(): number {
		return this.features.length
	}
}
