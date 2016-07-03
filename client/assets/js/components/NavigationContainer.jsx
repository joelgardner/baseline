import React from 'react'
import Navigation from './Navigation.jsx'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user : state.user,
    route : state.route
  }
}

const NavigationContainer = connect(mapStateToProps)(Navigation)

export default NavigationContainer
