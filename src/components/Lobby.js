import React from 'react';
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";

const Lobby = ({users, startGame}) => {

	return (

		<div id='lobby'>

			<div className='tab-container'>
				<div className={'title tab'}>Online players {users && users.length}</div>
				{users && users.map((e,i) => <motion.div 
					key={e.id} 
					className={'player tab'}
					animate={{ x: 0, opacity:1 }} 
					initial={{ x:100, opacity:0 }} 
					transition={{ type: 'spring', stiffness: 50 }}
					positionTransition={{transition:1}} 
					><FontAwesomeIcon icon={faUser} />
					{e.name}
					</motion.div>)}
			</div>
			<motion.div positionTransition={{transition:1}} >
				<Button text='Start Game' disabled={users.length < 2} onClick={startGame} className='fullwidth'/>
			</motion.div>

		</div>


		)
}

export default Lobby