import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import GamesList from './components/GamesList';
import GameDetails from './components/GameDetails';
import AddGame from './components/AddGame';
import AddClip from './components/AddClip';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={GamesList} />
      <Route path="game/:game_id" component={GameDetails} />
      <Route path="add-game" component={AddGame} />
      <Route path="add-clip" component={AddClip} />
    </Route>
  </Router>
),document.getElementById('root'));

