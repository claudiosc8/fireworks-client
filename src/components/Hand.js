import React from 'react';
import Card from './Card'

const Hand = ({currentTurn, className, cards, handlePlayHint, handleSelect, player, selected}) => {

	const currentPlayer = player === 0;

	return (

			<React.Fragment>
			
			<div className={`hand player${player}${className}`} onClick={() => handlePlayHint()}>
			{currentTurn ? 'current turn' : ''}
			{cards.map((card,i) => 
				<Card 
					key={i}
					value={card.value} 
					color={card.color} 
					unknown={currentPlayer} 
					selected={currentPlayer && selected === i}
					onClick={() => handleSelect(i)}
				/>
				)
			}</div>
			</React.Fragment>

	)

}

export default Hand