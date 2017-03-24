import React, { Component } from 'react';
import axios from "axios";
import Navbar from './Navbar';

class AddClip extends Component {

  constructor() {
    super();
    this.state = {
      minute: "",
      url: "",
      description: "",
      game_id: ""
    };
    this.handleChangeMinute = this.handleChangeMinute.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeMinute(event) {
    this.setState({
      minute: event.target.value
    });
  }

  handleChangeUrl(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleChangeDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let gameId = this.props.location.query.game_id;

    axios.post(`/clips/create`, {
      minute: this.state.minute,
      url: this.state.url,
      description: this.state.description,
      game_id: gameId,
      user_id: this.props.user_id
    })
      .then(response => {
        this.setState({
          game_id: response["data"]["game_id"]
        });
        window.location.href = `http://localhost:3000/game/${this.state.game_id}`;
      })
  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="jumbotron">
          <h1 id="pageTitle">Clip</h1>
          <div className="container-fluid">

            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Minute <i className="fa fa-clock-o"></i>
                </label>
                <div className="col-sm-2">
                  <input type="number" className="form-control" onChange={this.handleChangeMinute} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  URL <i className="fa fa-link"></i>
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Eg: http://..." onChange={this.handleChangeUrl} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Description <i className="fa fa-commenting-o"></i>
                </label>
                <div className="col-sm-10">
                  <textarea className="form-control" rows="3" onChange={this.handleChangeDescription}></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">Add Clip</button>
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