import React, { Component } from 'react';
// import axios from "axios";

class SearchControls extends Component {

  constructor() {
    super();
    this.state = {
      teamValue: "all",
      leagueValue: "all"
    };
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeLeague = this.handleChangeLeague.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeTeam(event) {
    this.setState({
      teamValue: event.target.value
    });
    console.log(event.target.value);
  }

  handleChangeLeague(event) {
    this.setState({
      leagueValue: event.target.value
    });
    console.log(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.teamValue);
    this.props.filterGames(this.state.teamValue, this.state.leagueValue);
  }


  render() {

    const teamsList = this.props.teamsList;
    console.log("props");
    console.log(this.props);

    const teamsListJSX = teamsList.map((team, i) => {
      return <option value={team} key={i}>{team}</option>
    });

    const leaguesList = this.props.leaguesList;

    const leaguesListJSX = leaguesList.map((league, i) => {
      return <option value={league} key={i}>{league}</option>
    });



    return (
      <div>
        <form className="" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm-5">
              <div className="form-group">
                <label className="control-label">
                  Team <i className="fa fa-users"></i>
                </label>
                <select className="form-control" onChange={this.handleChangeTeam}>
                  <option value="all">All</option>
                  {teamsListJSX}
                </select>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="form-group">
                <label className="">
                  League <i className="fa fa-list-ul"></i>
                </label>
                <select className="form-control" onChange={this.handleChangeLeague}>
                  <option value="all">All</option>
                  {leaguesListJSX}
                </select>
              </div>
            </div>
            <div className="col-sm-2">
              
              <button id="filterButton" type="submit" className="btn btn-primary">Filter</button>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default SearchControls;