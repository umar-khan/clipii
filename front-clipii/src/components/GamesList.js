import React, { Component } from 'react';
import SearchControls from './SearchControls';
import { Link } from "react-router";

class GamesList extends Component {
  render() {

    let gamesListJSX = this.props.gamesList.map((game, i) => {
      return (
        <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8" key={i}>
          <Link to={"/game/" + game._id} className="list-group-item">
            <h3 className="list-group-item-heading">{game.team0} vs {game.team1} - ({game.date ? game.date.split("T")[0] : ""})</h3>
            <p className="list-group-item-text">{game.league}</p>
          </Link>
        </div>
      )
    });

    return (
      <div>
        <div className="jumbotron">
          <h1 id="clipiiTitle">Clipii</h1>
          <SearchControls teamsList={this.props.teamsList} leaguesList={this.props.leaguesList} displayOnly={this.props.displayOnly} filterGames={this.props.filterGames} />
          <Link to="/add-game">
            <button className="btn btn-default">Add Game</button>
          </Link>
        </div>

        <div className="list-group list clearfix">
          {gamesListJSX}
        </div>
      </div>
    )
  }
}

export default GamesList;