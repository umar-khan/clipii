import React, { Component } from 'react';
import axios from "axios";
import Navbar from './Navbar';

class AddClip extends Component {

  constructor() {
    super();
    this.state = {
      team0: "",
      team1: "",
      league: "",
      date: ""
    };
    this.handleChangeTeam0 = this.handleChangeTeam0.bind(this);
    this.handleChangeTeam1 = this.handleChangeTeam1.bind(this);
    this.handleChangeLeague = this.handleChangeLeague.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeTeam0(event) {
    this.setState({
      team0: event.target.value
    });
  }

  handleChangeTeam1(event) {
    this.setState({
      team1: event.target.value
    });
  }

  handleChangeLeague(event) {
    this.setState({
      league: event.target.value
    });
  }

  handleChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`/games/create`, {
      team0: this.state.team0,
      team1: this.state.team1,
      league: this.state.league,
      date: this.state.date,
      user_id: this.props.user_id
    })
      .then(response => {
        window.location.href = `http://localhost:3000/`
      })

  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="jumbotron">
          <h1 id="pageTitle">Game</h1>
          <div className="container-fluid">

            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Team 1 <i className="fa fa-users"></i>
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" onChange={this.handleChangeTeam0} />
                </div>

              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Team 2 <i className="fa fa-users"></i>
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" onChange={this.handleChangeTeam1} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  League <i className="fa fa-list-ul"></i>
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" onChange={this.handleChangeLeague} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Date <i className="fa fa-calendar"></i>
                </label>
                <div className="col-sm-8">
                  <input type="date" className="form-control" onChange={this.handleChangeDate} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">Add Game</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default AddClip;