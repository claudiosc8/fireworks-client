import React, {useState} from 'react';
import Button from './Button'

const Lobby = ({users, startGame}) => {



	return (


		<div>
		<div>
			{users && users.map((e,i) => <div key={i}>{e.name}</div>)}
		</div>

		<Button text='Start Game' disabled={users.length < 2} onClick={startGame} />
		</div>


		)
}

export default Lobby