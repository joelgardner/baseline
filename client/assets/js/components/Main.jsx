import React from 'react'

let Main = ({ view }) => {
	return (
		<div id="main" className="container-fluid">
			{ React.createElement(view) }
		</div>
	)
}

export default Main
