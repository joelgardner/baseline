import React from 'react'

class Signup extends React.Component {

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
							<a className="btn btn-secondary btn-sm" href="#/login">Log in</a>
							<a className="btn btn-secondary btn-sm active" href="#/signup">Sign up</a>
						</div>
					</div>
					<div className="row">
						<div className="card card-block login-card">
						  	<h4 className="card-title">Sign up</h4>
						  	<div className="input-group">
								<span className="input-group-addon">
									<i className="material-icons md-22">business</i>
								</span>
								<input type="text" id="companyName" onChange={e => this.updateState(e.target.id, e.target.value)} className="form-control" placeholder="Company name" />
							</div>
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
							<div className="input-group">
								<span className="input-group-addon">
									<i className="material-icons md-22">lock</i>
								</span>
								<input type="password" id="password2" onChange={e => this.updateState(e.target.id, e.target.value)}  className="form-control" placeholder="Re-enter password" />
							</div>
							<button type="button" className="btn btn-primary btn-block" onClick={() => this.handleSignup()}>Sign up</button>
						</div>
					</div>
				</div>
				<div className="col-sm-3 col-md-4"></div>
		    </div>
		  )
	}

	handleSignup() {
		this.props.onSignupClick(this.state.email, this.state.password, this.state.companyName);
	}

	updateState(propName, value) {
		this.setState({ [propName] : value });
	}
}



export default Signup
