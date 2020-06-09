import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Button from './Button'
import Logo from '../img/logo.svg'

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


		<div className="page-container flex">
		<div className={'form-wrapper'}>

			<img src={Logo} alt='logo' className='logo'/>
			<form onSubmit={handleSubmit} className="form">


			 	<input type="text" id='name-input' placeholder="Your name" onChange={(e) => setName(e.target.value)} />

			  	<input type="text" id='room-input' placeholder="Room name" onChange={(e) => setRoom(e.target.value)} />

			  	<div className='space'></div>
			  	<Link onClick={handleSubmit} to={`/${room}`}>
			  		<Button submit={name && room} className="fullwidth" text={'Sign In'} />
			  	</Link>
			  	
			  	
			</form>
			
		
		</div>
		<div className='copyright-section'>
			<a href='http://claudioscotto.it' rel="noopener noreferrer" target="_blank" className='copyright'>©2020 - Claudio Scotto</a>
		</div>
		</div>


		)
}

export default Join