export interface ApiClient {
	get<T>(url: string): Promise<T>
	post<T, Y>(url: string, data: Y): Promise<T>
}
