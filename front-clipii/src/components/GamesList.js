import React, {Component} from 'react';
// import { Link } from "react-router";

class GamesList extends Component {
  render() {
    // // console.log(this.props);
    // console.log("here is this.props.songs " + this.props.songs);
    // console.log("here is the function this.props.playSong" + this.props.playSong);

    // let songsJSX = this.props.songs.map((song, i) => {
    //   return (
    //     <li key={i}>
    //       <Link to={"/songs/" + song["id"]}>
    //         {song["title"]}
    //       </Link>
    //       <button onClick={() => {this.props.playSong(song)}}>
    //         Play
    //       </button>
    //     </li>
    //   )
    // });
    // console.log("here is songsjSX" + songsJSX);
    

    return (
      <div>
        <p>Hello from Gameslist</p>
      </div>
    )
  }
}

export default GamesList;