import React, { Component } from 'react';
import axios from "axios";

class SearchControls extends Component {
  render() {


    return (
      <div>

        <h2>From searchControls</h2>
        <p>{JSON.stringify(this.props.displayOnly)}</p>
        <form className="form-inline">
          <div className="form-group">
            <select className="form-control">
              <option value="all">All</option>
            </select>
          </div>
          <div className="form-group">
            <select className="form-control">
              <option value="all">All</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <button type="submit" className="btn btn-default">Filter</button>
        </form>

      </div>
    )
  }
}

export default SearchControls;