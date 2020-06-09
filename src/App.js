import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Join from './components/Join'
import Game from './components/Game'



const App = () => {

  return (
    <Router basename={'/fireworks/'}>
      <Route path='/' exact component={Join} />
      <Route path='/:room' component={Game} />
    </Router>
  );

}

export default App;
