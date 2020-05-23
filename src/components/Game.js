import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useParams, Redirect } from 'react-router-dom'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Lobby from './Lobby'
import Card from './Card'
import Hand from './Hand'
import Table from './Table'
import Deck from './Deck'
import Discard from './Discard'
import Token from './Token'
import Hints from './Hints'
import '../css/Game.css';

let socket;
const ENDPOINT = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_URL_DEV : process.env.REACT_APP_SERVER_URL_PRODUCTION

const Game = () => {

	let { room } = useParams();
	const [game, setGame] = useState({})
	const [currentUser, setCurrentUser] = useState('')
	const [colors] = useState(['red', 'white', 'blue', 'green', 'yellow'])
	const [users, setUsers] = useState([]);
	const [players, setPlayers] = useState([]);
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState(undefined)
	const [hint, setHint] = useState({})

	//SETUP SOCKET
	useEffect( () => {

		const gameInfo = JSON.parse(sessionStorage.getItem('game'));

		if(!gameInfo) {
			setError(true)
			return 
		}

		if(gameInfo) {

			const {name} = gameInfo;
			socket = io(ENDPOINT);
			socket.emit('join', {name, room}, (response) => {
				if(response.error) {
					setError({message:response.error})
				} else {
					setCurrentUser(response.name)
				}
			});
			return () => {
				socket.emit('disconnect');
				socket.off();
			}
		} else {
			setError({redirect:true})
		}

	}, [room])

	//HANDLING ONLINE USERS
	useEffect( () => {

		if(socket) {
			socket.on("onlineUsers", ({ users }) => {
		      setUsers(users);
		    });
		}

	}, [users])

	useEffect( () => {

		if(socket) {
			socket.on("GameUpdate", (game) => {
		      setGame(game);
		      setLoading(false)
		    });
		}

	}, [])

	useEffect( () => {

		if(socket) {
			socket.on("DrawCard", (game) => {
		      setGame(game);

		    });
		}

	}, [])


	useEffect( () => {

		if(game.started && currentUser) {
			let copy = Object.assign([], game.players)
			const player = copy.find(player => player.name === currentUser)
			if(player.order !== 0) {
				const chunk = copy.splice(0, player.order)
				copy = [...copy, ...chunk]
			}
			setPlayers(copy)
		}

	}, [game, currentUser])
			      

	const handleStartGame = (e) => {
		e.preventDefault(); 
		socket.emit('startGame')
	}

	const handleSelect = (i) => {
		const index = selected === i ? undefined : i
		setSelected(index)
	}

	const handleSelectHint = (type, value) => {
		const data = (hint.value === value && hint.type === type) ? {} : {type, value}
		setHint(data)
	}

	const handlePlayCard = (type) => {

		if(type === 'discard' || type === 'play') {
			const data = {type, action: selected}
			socket.emit('playTurn', data)
			setSelected(undefined)
		} 
		
	}

	const handlePlayHint = (type, target) => {

		if(type === 'hint') {
			const action = Object.assign({}, hint)
			action.target = target;
			const data = {type, action}
			socket.emit('playTurn', data)
			setHint({})
		}
		
	}

	if(error && error.redirect) {
		return <Redirect to='/' />
	}

	if(error && error.message) {
		return error.message
	}

	if(game && !game.started) {
		return <Lobby users={users} startGame={handleStartGame}/>
	}

	if(players.length > 0) {
	console.log(game, players)

	return (

		<div id="game" className={`number-of-players-${players.length}`}>

		{players.map((player, i) => {

			const emptySelection = hint.value === undefined && hint.type ===  undefined
			const currentTurn = game.currentTurn === player.order;

			return <Hand
						key={i}
						currentTurn={currentTurn}
						className={!emptySelection && i !== 0 ? ' selectable' : ''}
						cards={game.cards.hands[player.order]}
						handlePlayHint={() => !emptySelection ? handlePlayHint('hint', i) : null}
						handleSelect={(e) => i === 0 && currentTurn ? handleSelect(e) : null}
						selected={selected}
						player={i}
						lastcard={game.drawnCard}
					/>

		})}
		
		<div id="playing-area">
			<div className="row">
				<Deck 
					id="remainingCards"
					title="Remaining Cards" 
					number={game.cards.deck.length} 
					distance={.5}
					unknown
				/>

				<Deck 
					id="discardPile"
					title="Discard Pile" 
					number={game.cards.discardPile.length} 
					onClick={() => selected !== undefined ? handlePlayCard('discard') : null} 
					distance={0.5}
				/>

			</div>
			<div className="row">
			<Table 
				colors={colors} 
				onClick={() => selected !== undefined ? handlePlayCard('play') : null}
				cardsOnTable={game.cards.table}
			/>
			</div>
			<div className="row">
				<div className="tokens">
					<Token id={'note'} name={'Note tokens'} number={game.noteTokens} distance={3}/>
					<Token id={'storm'} name={'Storm tokens'} number={game.stormTokens} distance={3}/>
				</div>
			<Hints 
				hintColor={(e) => game.currentTurn === players[0].order ? handleSelectHint('color', e) : null}
				hintValue={(e) => game.currentTurn === players[0].order ? handleSelectHint('value', e) : null}
				hint={hint}
				colors={colors}
			/>
			</div>
		</div>
		</div>


		)

	} else {
		return 'loading'
	}


	
	}

export default Game