import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from "axios";

class App extends Component {

  constructor() {
    super();
    this.state = {

      teamsList: [],
      leaguesList: [],
      gamesList: [],
      user_id: "58d014b021023435d50eb9d3",
      displayOnly: {
        team: "all",
        league: "all"
      }
    };
    this.filterGames = this.filterGames.bind(this);

  }

  filterGames(team, league) {

    axios.get(`http://localhost:8080/games?team=${team}&league=${league}`)
      .then(response => {
        this.setState({
          gamesList: response["data"],
          displayOnly: {
            team: team,
            league: league
          }
        });
      })
  }

  componentWillMount() {
    // Get list of teams for filter dropdown
    axios.get(`http://localhost:8080/teams`)
      .then(response => {
        this.setState({
          teamsList: response["data"]
        });
      })

    // Get list of leagues for filter dropdown
    axios.get(`http://localhost:8080/leagues`)
      .then(response => {
        this.setState({
          leaguesList: response["data"]
        });
      })

    axios.get(`http://localhost:8080/games?team=${this.state.displayOnly.team}&league=${this.state.displayOnly.league}`)
      .then(response => {
        this.setState({
          gamesList: response["data"]
        });
      })

  }

  render() {

    const gamesList = this.state.gamesList;

    return (
      <div className="App">
        <Navbar />

        {React.cloneElement(
          this.props.children,
          {
            gamesList: gamesList,
            teamsList: this.state.teamsList,
            leaguesList: this.state.leaguesList,
            user_id: this.state.user_id,
            displayOnly: this.state.displayOnly,
            filterGames: this.filterGames
          }
        )}
      </div>
    );
  }
}

export default App;
