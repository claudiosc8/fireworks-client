import React, {useEffect, useRef} from 'react';
import confetti from 'canvas-confetti';

 const Fireworks = ({id}) => {
     let ref = useRef();

     useEffect(() => {

        let c = ref.current;
        let ctx = c.getContext('2d');
       
       	const myConfetti = confetti.create(c, { resize: true });

       	const colors = ['#03A9F4', '#F44336', '#FFC107', '#8BC34A', ' #D5D5D5']
       	const shapes = ['circle'];

		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		function randomInRange(min, max) {
		  return Math.random() * (max - min) + min;
		}

		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const interval = setInterval(function() {
			  const timeLeft = animationEnd - Date.now();

			  if (timeLeft <= 0) {
			    return clearInterval(interval);
			  }

			  const particleCount = 100;

			  myConfetti(Object.assign({}, defaults, { colors: [colors[getRandomInt(0,4)]], shapes, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
			  myConfetti(Object.assign({}, defaults, { colors: [colors[getRandomInt(0,4)]], shapes, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
			}, 500);

     });
     
     return (
         <canvas
             ref={ref} 
             id={id}
         />
     );
 };




 
 export default Fireworks;