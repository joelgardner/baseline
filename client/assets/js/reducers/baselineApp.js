import { combineReducers } from 'redux'
import {
	ROUTE_CHANGE,
	API_REQUEST,
	API_RESPONSE,
	API_ERROR,
	WHOAMI_RESPONSE,
	WHOAMI_REQUEST
} from "../actions/actions";


/**
ROUTING STATE
**/

function route(state = '/login', action) {
	switch (action.type) {
		case ROUTE_CHANGE:
			return action.route;
		default:
			return state;
	}
}


/**
API ACTIVITY
**/

var initialApiActivityState = {
	path : null,
	fetching : false,
	error : null,
	token : null
}
function apiActivity(state = initialApiActivityState, action) {
	switch (action.type) {
		case API_REQUEST:
			return { path: action.path, fetching: true };
		case API_RESPONSE:
			return { path: action.path, fetching: false };
		case API_ERROR:
			return { path: action.path, fetching: false, error: action.error };
		default:
			return state;
	}
}


/**
USER
**/

function user(state = {}, action) {
	switch (action.type) {
		case WHOAMI_RESPONSE:
			return action.user;
		case WHOAMI_REQUEST:
			return state;
		default:
			return state;
	}
}


/**
ERRORS
**/

function error(state = null, action) {
	switch (action.type) {
		case WHOAMI_RESPONSE:
			return action.user;
		case WHOAMI_REQUEST:
			return state;
		default:
			return state;
	}
}


/**
ROOT APPLICATION STATE
**/

const baselineApp = combineReducers({
	route,
	apiActivity,
	user,
	error
})

export default baselineApp
