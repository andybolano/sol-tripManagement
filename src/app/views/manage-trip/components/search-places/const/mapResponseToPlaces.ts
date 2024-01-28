import { MapBoxFeature } from "@/app/shared/interfaces/Mapbox"

export const mapResponseToPlaces = (features: MapBoxFeature[]) =>
	features.map((item) => ({
		id: item.id,
		name: item.place_name,
		location: {
			lng: item.center[0],
			lat: item.center[1],
		},
	}))
