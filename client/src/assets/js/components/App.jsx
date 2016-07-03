import React from 'react'
import NavigationContainer from './NavigationContainer.jsx'
import MainContainer from './MainContainer.jsx'

let App = ({ store }) => {
  return (
    <div>
      <NavigationContainer />
      <MainContainer />
    </div>
  )
}

export default App
