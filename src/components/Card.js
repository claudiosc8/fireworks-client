import React, {useState} from 'react';

const Card = ({value, color, selected, currentPlayer, onClick}) => {

	return (


		<div className="card" onClick={onClick}>
			{currentPlayer ? `unknown ${selected ? 'selected' : ''}`
				: `${value}${color}`}
		</div>


		)
}

export default Card