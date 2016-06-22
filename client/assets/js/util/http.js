import fetch from 'isomorphic-fetch'

class Http {
	static postJson(url, payload) {
		return fetch(url, {
			method: 'post',
			body: typeof(payload) === "string" ? payload : JSON.stringify(payload),
			credentials: 'same-origin',
			headers: {
				//'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(Http.handleResponse);
	}

	static get(url, token) {
		return fetch(url, { 
			credentials: 'same-origin',
			headers: {
				//'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'JWT ' + token
			}
		})
		.then(Http.handleResponse);
	}

	static handleResponse(res) {
		if (res.status !== 200) throw Error(`${res.status}: ${res.statusText}`);
		return res.json()
	}

}

export default Http
