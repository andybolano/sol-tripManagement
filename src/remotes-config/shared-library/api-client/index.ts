import { httpClient, httpClientMap } from "sharedLibrary/apiClient"
import { ApiClient } from "./interfaces/ApiClient"

export class LocalApiClient implements ApiClient {
	private api: any

	constructor(httpClient: any) {
		this.api = httpClient
	}

	async get<T>(url: string): Promise<T> {
		return this.api.get(url)
	}

	async post<T, Y>(url: string, data: Y): Promise<T> {
		return this.api.post(url, data)
	}

	async patch<T, Y>(url: string, data: Y): Promise<T> {
		return this.api.patch(url, data)
	}
}

export const httpClientLocal = new LocalApiClient(httpClient)
export const httpClientMapLocal = new LocalApiClient(httpClientMap)
