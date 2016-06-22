import React from 'react'
import LoginContainer from './LoginContainer.jsx'
import SignupContainer from './SignupContainer.jsx'
import Error from './Error.jsx'
import Main from './Main.jsx'
import { connect } from 'react-redux'


const routes = {
	'/login' : LoginContainer,
	'/signup' : SignupContainer
};

const getViewForRoute = (route) => {

	// TODO: normalize the route to pass parameters

	return routes[route] || Error;
}

const mapStateToProps = (state) => {
	return {
		view : getViewForRoute(state.route)
	}
}

const MainContainer = connect(mapStateToProps)(Main)

export default MainContainer
