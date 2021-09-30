// error object for when there is no internet connection
export class NetworkError extends Error {
	constructor() {
		super();
		this.name = 'NetworkError';
		this.message = 'No internet connection detected';
	}
}
