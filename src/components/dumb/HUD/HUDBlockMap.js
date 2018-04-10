import React from 'react'

export default props => {
	const {title, subtitle } = props
	return (
		<div className="HUDBlockMap">
		<h2>{title}</h2>
		<h3>{subtitle}</h3>
		</div>
	)
}