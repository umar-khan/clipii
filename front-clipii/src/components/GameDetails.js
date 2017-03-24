import React, { Component } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Link } from "react-router";

class GameDetails extends Component {

  constructor() {
    super();
    this.state = {
      game: {},
      clips: []
    };

  }

  componentWillMount() {
    let gameId = this.props.location.pathname.split("/")[2];
    // Get list of teams for filter dropdown
    axios.get(`/games/${gameId}`)
      .then(response => {
        this.setState({
          game: response["data"][0]
        });
      })

    axios.get(`/clips/${gameId}`)
      .then(response => {
        this.setState({
          clips: response["data"]
        });
      })
  }

  render() {

    let clipsListJSX = this.state.clips.map((clip, i) => {
      return (
        <div className="col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8" key={i}>
          <div className="list-group-item">
            <h2 className="list-group-item-heading">{clip.minute}'' {clip.description}</h2>
            <a href={clip.url}>
              <p className="list-group-item-text">{clip.url}</p>
            </a>
            <video controls preload="meta">
              <source src={clip.url} type="video/mp4" />
            </video>
          </div>
        </div>
      )
    });


    return (
      <div>
        <Navbar />
        <div className="jumbotron">
          <h1 id="pageTitle">
            {this.state.game.team0 + " "}
            vs.
            {" " + this.state.game.team1}
            <h2>
              ({this.state.game.date ? this.state.game.date.split("T")[0] : ""})
            </h2>
          </h1>

          <Link to={"/add-clip?game_id=" + this.state.game._id}>
            <div className="text-center">
              <button className="btn btn-default" id="add-clip-button">Add Clip</button>
            </div>
          </Link>
        </div>
        <div className="list clearfix">
          {clipsListJSX}
        </div>
      </div>
    )
  }
}

export default GameDetails;