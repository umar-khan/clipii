import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchControls from './components/SearchControls';
import axios from "axios";

class App extends Component {

  constructor(){
		super();
		this.state = {

      teamsAll: [],
      leaguesAll: [],
			displayOnly: {
        team: "all",
        league: "all"
      }
		};
		
	}

  componentWillMount() {
		axios.get(`http://localhost:8080/leagues?team=${this.state.displayOnly.team}&league=${this.state.displayOnly.league}`)
			.then(response => {
        console.log(response["data"]);
				// this.setState({
				// 	todos: response["data"]
				// });
			})
	}

  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>clipii</h1>
        <SearchControls displayOnly={this.state.displayOnly} />
        
        {React.cloneElement(this.props.children, { songs: "songs", playSong: "this.playSong"})}
      </div>
    );
  }
}

export default App;
