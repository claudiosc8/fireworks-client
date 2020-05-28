import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useParams, Redirect } from 'react-router-dom'
import Lobby from './Lobby'
import Hand from './Hand'
import Table from './Table'
import Deck from './Deck'
import Token from './Token'
import Hints from './Hints'
import Log from './Log'
import GameOver from './GameOver'

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
		setHint({})
	}

	const handleSelectHint = (type, value) => {
		const data = (hint.value === value && hint.type === type) ? {} : {type, value}
		setHint(data)
		setSelected(undefined)
	}

	// const handlePlayCard = (type) => {

	// 	if(type === 'discard' || type === 'play') {
	// 		const data = {type, action: selected}
	// 		socket.emit('playTurn', data)
	// 		setSelected(undefined)
	// 		setHint({})
	// 	} 
		
	// }

	const handlePlayCard = (type, index) => {

		if(type === 'discard' || type === 'play') {
			const data = {type, action: index || selected}
			socket.emit('playTurn', data)
			setSelected(undefined)
			setHint({})
		} 
		
	}

	const handlePlayHint = (type, target) => {
		console.log('target', target)
		if(type === 'hint') {
			const action = Object.assign({}, hint)
			action.target = target;
			const data = {type, action}
			socket.emit('playTurn', data)
			setHint({})
			setSelected(undefined)
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

		<React.Fragment>
		<Log messages={game.log} />

		{ game.gameOver && <GameOver score={game.score} result={game.result} gameover={game.stormTokens === 0} /> }

		<div id="game">

		<div id="playing-area" className="half">
			<div>
			<div className="row">

				<Deck 
					id="remainingCards"
					cards={game.cards.deck} 
					distance={1}
					unknown
					className=' section'
				/>

				<div id="tokens" className='section'>
					<Token id={'note'} name={'Note tokens'} number={game.noteTokens} distance={5} className=" note"/>
					<Token id={'storm'} name={'Storm tokens'} number={game.stormTokens} distance={5} className=" storm"/>
				</div>

			</div>
			<div className="row">
			<Table 
				colors={colors} 
				onClick={() => selected !== undefined ? handlePlayCard('play') : null}
				cardsOnTable={game.cards.table}
				className={selected !== undefined ? ' selectable' : ''}
			/>
			</div>
			<div className="row">
			
			<Deck 
				id="discard"
				title="Discard Pile" 
				onClick={() => selected !== undefined ? handlePlayCard('discard') : null} 
				distance={1}
				className={` section border grow${selected !== undefined ? ' selectable' : ''}`}
				cards={game.cards.discardPile}
			/>

			<Hints 
				hintColor={(e) => !game.gameOver && game.currentTurn === players[0].order && game.noteTokens > 0 ? handleSelectHint('color', e) : null}
				hintValue={(e) => !game.gameOver && game.currentTurn === players[0].order && game.noteTokens > 0 ? handleSelectHint('value', e) : null}
				hint={hint}
				colors={colors}
			/>
			</div>
			</div>
		</div>

		<div id="players-area" className={`number-of-players-${players.length} half`}>
			{players.map((player, i) => {

				const emptySelection = hint.value === undefined && hint.type ===  undefined
				const currentTurn = game.currentTurn === player.order;

				return <Hand
							key={i}
							currentTurn={currentTurn}
							className={!emptySelection && i !== 0 ? ' selectable' : ''}
							cards={game.cards.hands[player.order]}
							handlePlayHint={() => !game.gameOver && !emptySelection && i !== 0 && game.noteTokens > 0 ? handlePlayHint('hint', player.order) : null}
							handleSelect={(e) => !game.gameOver && i === 0 && currentTurn ? handleSelect(e) : null}
							selected={selected}
							player={player}
							index={i}
							lastcard={game.drawnCard}
							handlePlayCard={handlePlayCard}
							deselect={() => setSelected(undefined)}
						/>

			})}
		</div>


		</div>
		</React.Fragment>

		)

	} else {
		return 'loading'
	}


	
	}

export default Game