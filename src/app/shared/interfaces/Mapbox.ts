export interface MapboxPlaces {
	type: string
	query: string[]
	features: MapBoxFeature[]
	attribution: string
}

export interface MapBoxFeature {
	id: string
	type: string
	place_type: string[]
	relevance: number
	properties: Properties
	text: string
	place_name: string
	bbox?: number[]
	center: number[]
	geometry: Geometry
	context: Context[]
	matching_text?: string
	matching_place_name?: string
}

export interface Context {
	id: string
	mapbox_id: string
	wikidata?: string
	short_code?: string
	text: string
}

export interface Geometry {
	type: string
	coordinates: number[]
}

export interface Properties {
	mapbox_id?: string
	wikidata?: string
	foursquare?: string
	landmark?: boolean
	category?: string
	accuracy?: string
}

export interface MapLocation {
	lat: number
	lng: number
}
