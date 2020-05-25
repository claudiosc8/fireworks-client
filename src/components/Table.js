import React from 'react';
import Card from './Card'
import Empty from './Empty'

const Table = ({onClick, colors, cardsOnTable, className}) => {

	const handleDragOver = e => {
	    e.preventDefault();
	    e.stopPropagation();
	    console.log('over')
	  };

	return (


		<div id="table" onClick={onClick} onDragOver={handleDragOver} className={`section${className}`}>

			<div className='fullwidth flex cards-wrapper'> 
			{colors.map((color,i) =>  {
				return cardsOnTable[color] === 0 ? <Empty key={i} />
					: <Card value={cardsOnTable[color]} color={color} key={i} />
			})}
			</div>

		</div>


		)
}

export default Table