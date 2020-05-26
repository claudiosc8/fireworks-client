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


		<div id="table" onClick={onClick} onDragOver={handleDragOver} className={`section border${className}`}>

			<div className='fullwidth flex cards-wrapper'> 
			{colors.map((color,i) =>  {
				const card = {color:color, value:cardsOnTable[color]}
				return cardsOnTable[color] === 0 ? <Empty key={i} /> : <Card card={card} key={i} />
			})}
			</div>

		</div>


		)
}

export default Table