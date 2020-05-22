import React from 'react';

const Discard = ({number, onClick}) => {

	return (

		<div onClick={onClick}>
			Discard pile: {number}
		</div>

		)
}

export default Discard