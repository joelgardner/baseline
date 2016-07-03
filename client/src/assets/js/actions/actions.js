import Http from '../util/http'

//
/// Synchronous action creators
//

export const ROUTE_CHANGE = 'ROUTE_CHANGE'
export function routeChange(route) {
	return { type : ROUTE_CHANGE, route : route };
}

export const API_REQUEST = 'API_REQUEST'
export function reqApi(route) {
	return { type : API_REQUEST, path : route };
}

export const API_RESPONSE = 'API_RESPONSE'
export function recApi(route) {
	return { type : API_RESPONSE, path : route };
}

export const API_ERROR = 'API_ERROR'
export function errorApi(route, error) {
	return { type : API_ERROR, path : route, error: error };
}

export const WHOAMI_RESPONSE = 'WHOAMI_RESPONSE'
export function handleWhoami(user) {
	return { type: WHOAMI_RESPONSE, user : user };
}


/**
  * LOCAL AUTH
  */

/// (email : String, password : String) : Object
export const API_LOCALAUTH_REQUEST = 'API_LOCALAUTH_REQUEST'
export function requestLocalAuth(email, password) {
	return { type : API_LOCALAUTH_REQUEST, email : email, password : password }
}

/// (error : Object, user : Object) : Object
export const API_LOCALAUTH_RESPONSE = 'API_LOCALAUTH_RESPONSE'
export function responseLocalAuth(error, user, token) {
	return { type : API_LOCALAUTH_RESPONSE, error : error, user : user, token : token }
}

/// thunk
/// (email : String, password : String) : Func
export function attemptLocalAuth(email, password) {
	var route = '/auth/login';
	return function(dispatch) {
		dispatch(reqApi(route));
		dispatch(requestLocalAuth(email, password));
		return Http.postJson(route, { email : email, password : password })
			.then(res => {
				if (res.token) {
					window.localStorage.setItem("__token__", res.token);
				}
				dispatch(responseLocalAuth(res.error, res.user));
				dispatch(recApi(route));
			})
			.catch(err => {
				dispatch(errorApi(route, err));
			})
	}
}



/**
  * SIGNUP
  */

/// (email : String, password : String, companyName : String) : Object
export const API_SIGNUP_REQUEST = 'API_SIGNUP_REQUEST'
export function requestSignup(email, password, companyName) {
	return { type : API_SIGNUP_REQUEST, email : email, password : password, company: companyName }
}

/// (error : Object, user : Object) : Object
export const API_SIGNUP_RESPONSE = 'API_SIGNUP_RESPONSE'
export function responseSignup(error, user) {
	return { type : API_SIGNUP_RESPONSE, error : error, user : user }
}

/// thunk
/// (email : String, password : String, companyName : String) : Func
export function signUp(email, password, companyName) {
	var route = '/auth/signup';
	return function(dispatch) {
		dispatch(reqApi(route));
		dispatch(requestSignup(email, password, companyName));
		return Http.postJson(route, { email : email, password : password, companyName : companyName })
			.then(res => {
				dispatch(responseSignup(res.error, res.user));
				dispatch(recApi(route));
			}, (err) => {
				dispatch(errorApi(route, err));
			})
	}
}


//
/// THUNKS: Asynchronous action creators (side-effecty things)
//

/**
  * Use setHashTo(route : String) to navigate.
  * It sets the hash and dispatches a routeChange event which reducers.baselineApp.route handles.
  */
export function setHashTo(route) {
	return function (dispatch) {
		window.location.hash = route;
	}
}

/*
 * Whoami gets the user
 */

export function whoami(token) {
	var route = '/auth/whoami';
	return function(dispatch) {
		dispatch(reqApi(route));
		return Http.get(route, token)
			.then(res => {
				var user = res.user;

				// if no valid user in session, redirect to /login
				if (!user || !user.id) return dispatch(setHashTo('/login'));

				// otherwise set the user in the store
				dispatch(handleWhoami(user));
			}, (err) => {
				dispatch(errorApi(route, err));
			})
	}
}

export function initSession() {

	return function(dispatch) {
		var token = window.localStorage.getItem("__token__");
		if (!token) return dispatch(setHashTo("/login"));
		dispatch(whoami(token));
	}

}