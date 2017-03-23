import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import GamesList from './components/GamesList';
import GameDetails from './components/GameDetails';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={GamesList} />
      <Route path="games/:game_id" component={GameDetails} />
    </Route>
  </Router>
),document.getElementById('root'));

