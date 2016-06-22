import React from 'react'

class Login extends React.Component {

	constructor() {
		super();

		// component-level state that holds the values in the inputs.
		// unrelated to the Store or its state
		this.state = {
			email: "",
			password: ""
		}
	}

	render() { 
		return (
		    <div className="login-container row">
				<div className="col-sm-3 col-md-4"></div>
				<div className="col-sm-6 col-md-4">
					<div className="row text-xs-center">
						<div className="btn-group signup-group" role="group">
							<a className="btn btn-secondary active btn-sm" href="#/login">Log in</a>
							<a className="btn btn-secondary btn-sm" href="#/signup">Sign up</a>
						</div>
					</div>
					<div className="row">
						<div className="card card-block login-card">
						  	<h4 className="card-title">Log in</h4>
						  	<div className="input-group">
								<span className="input-group-addon">
									<i className="material-icons md-22">account_box</i>
								</span>
								<input type="text" id="email" onChange={e => this.updateState(e.target.id, e.target.value)} className="form-control" placeholder="Email" />
							</div>
							<div className="input-group">
								<span className="input-group-addon">
									<i className="material-icons md-22">lock</i>
								</span>
								<input type="password" id="password" onChange={e => this.updateState(e.target.id, e.target.value)}  className="form-control" placeholder="Password" />
							</div>
							<button type="button" className="btn btn-primary btn-block" onClick={() => this.handleLoginAttempt()}>Log  in</button>
						</div>
					</div>
				</div>
				<div className="col-sm-3 col-md-4"></div>
		    </div>
		  )
	}

	handleLoginAttempt() {
		this.props.onLoginClick(this.state.email, this.state.password);
	}

	updateState(propName, value) {
		this.setState({ [propName] : value });
	}
}



export default Login
