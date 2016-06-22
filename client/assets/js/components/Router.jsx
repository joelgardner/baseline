import React from 'react'


class Router extends React.Component {

	constructor() {
		super();
		console.log("only once?");

		
	}

	render() { 
		return null;
	}

	handleLoginAttempt() {
		this.props.onLoginClick(this.state.email, this.state.password);
	}

	updateState(propName, value) {
		this.setState({ [propName] : value });
	}
}



export default Router
