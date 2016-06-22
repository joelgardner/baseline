import React from 'react'
//import { connect } from 'react-redux'

let Navigation = ({ dispatch, user, route }) => {

  return (
  <nav className="navbar navbar-fixed-top">
    <ul className="nav navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#/bugs"><i className="material-icons">bug_report</i></a>
      </li>
    </ul>

    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">{user.email}</li>
      <li className="nav-item active">
        <a className="nav-link" href="#/settings"><i className="material-icons">settings</i></a>
      </li>
    </ul>
  </nav>

  )
}
//Navigation = connect()(Navigation)

export default Navigation
