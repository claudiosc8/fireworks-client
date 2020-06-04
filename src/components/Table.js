import React from 'react';
import Card from './Card'
import Empty from './Empty'

const Table = ({onClick, colors, cardsOnTable, className, title}) => {

	const handleDragOver = e => {
	    e.preventDefault();
	    e.stopPropagation();
	    console.log('over')
	  };

	return (


		<div id="table" onClick={onClick} onDragOver={handleDragOver} className={`section border${className}`}>

			{title && <div className='title'>{title}</div>}

			<div className='fullwidth flex cards-wrapper center'> 
			{colors.map((color,i) =>  {
				const card = {color:color, value:cardsOnTable[color]}
				return cardsOnTable[color] === 0 
				? <div className={`empty-wrapper`} key={i}><Empty /></div>
				: <div className={`card-wrapper`} key={i}><Card card={card}/></div>
			})}
			</div>

		</div>


		)
}

export default Table