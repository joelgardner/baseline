import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import baselineApp from './reducers/baselineApp'
import App from './components/App.jsx'
import { initSession, whoami, routeChange } from './actions/actions'

// build our store
let store = createStore(baselineApp, applyMiddleware(thunkMiddleware))

// initialize the app
render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  	document.getElementById('content')
)

// send a whoami request to get user info
store.dispatch(initSession());

// handler for hash changes
// it defaults to "/login" if no hash
let hashDidChange = () => store.dispatch(routeChange(document.location.hash.substring(1) || "/login"))

// routing is all done via hash events
window.onhashchange = hashDidChange;

// kick off the routing for the current route
hashDidChange()
