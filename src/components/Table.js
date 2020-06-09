import React from 'react';
import Card from './Card'
import Empty from './Empty'
import CardPile from './CardPile'

const Table = ({onClick, colors, cardsOnTable, className, title}) => {


	return (

		<div id="table" onClick={onClick} className={`section border${className}`}>

			{title && <div className='title'>{title}</div>}

			<div className='fullwidth flex cards-wrapper center'> 
			{colors.map((color,i) =>  {
				const card = cardsOnTable[color] === 0 ? [] : Array(cardsOnTable[color]).fill({}).map((e,index) => { return {color:color, value:index+1} })
				console.log(card) 
				return <CardPile cards={card} distance={3} key={i}/>
			})}
			</div>

		</div>


		)
}

export default Table