import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Button from './Button'

const Join = () => {

	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	const handleSubmit = (e) => {
		console.log('form')
		if(!name || !room) {
			e.preventDefault()
		}  else {

			const game = {name, room}
			sessionStorage.setItem('game', JSON.stringify(game));
			
			return null
		}
	}


	return (


		<div className="page-container">
		<div>
		<div className="title">Logo</div>
		<div className={'form-wrapper'}>
			<form onSubmit={handleSubmit} className="form">

				<label htmlFor='name-input'>Your Name</label>
			 	<input type="text" id='name-input' placeholder="Your name" onChange={(e) => setName(e.target.value)} />
			  	<label htmlFor='room-input'>Room Name</label>
			  	<input type="text" id='room-input' placeholder="Room name" onChange={(e) => setRoom(e.target.value)} />

			  	<div className='space'></div>
			  	<Link onClick={handleSubmit} to={`/${room}`}>
			  		<Button submit={name && room} className="fullwidth" text={'Sign In'} />
			  	</Link>
			  	
			  	
			</form>
			
		</div>
		</div>
		<div className='copyright-section'>
			<a href='http://claudioscotto.it' rel="noopener noreferrer" target="_blank" className='copyright'>©2020 - Claudio Scotto</a>
		</div>
		</div>


		)
}

export default Join