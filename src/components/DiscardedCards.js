import React, {useState, useEffect} from 'react';
import { motion } from "framer-motion";
import Card from './Card'

const DiscardedCards = ({cards, colors}) => {

	const [cardList, setCardList] = useState([])

	useEffect( () => {

		const list = [];

		colors.forEach(color => {
			const chunk = cards.filter(card => card.color === color).sort((a, b) => a.value - b.value);
			list.push(chunk)
		})

		setCardList(list)

	}, [cards, colors])

	console.log(cardList)

	return (

			<div className='content'>
			{
				cardList.map((color,i) => {

					return <div className='row'>

					{ color.map((card,i) => {

						return	<motion.div 
								key={card.id} 
								animate={{ scale: 1, transition: .2 }} 
								initial={{ scale:0 }} 
							  	className={`card-wrapper`}
							>
								 <Card id={card.id} card={card} />
							</motion.div> 


							

						}) }

					</div>

				})
			}
			</div>
			

		)
}

export default DiscardedCards