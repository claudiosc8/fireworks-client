import React from 'react';
import Card from './Card'

const Table = ({onClick, colors, cardsOnTable}) => {

	return (


		<div id="table" onClick={onClick}>

		Table: 
			<div className='fullwidth flex'> 
			{colors.map((color,i) =>  <Card value={cardsOnTable[color]} color={color} key={i} />)}
				
			</div>

		</div>


		)
}

export default Table