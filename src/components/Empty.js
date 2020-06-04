import React from 'react';


const Empty = ({id, className}) => {


	return (
				<span className={`empty${className || ''}`}></span>
		)
}

export default Empty