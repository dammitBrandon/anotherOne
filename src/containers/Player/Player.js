import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Player extends Component {
  render() {
    return (
      <div className="container">
        <h1>Media Player</h1>
        <Helmet title="Player"/>

        <p>This is where the media player is going to be located</p>

        <div className="pcast-player">
          <div className="pcast-player-controls">
            <button className="pcast-play"><i className="fa fa-play"></i><span>Play</span></button>
            <button className="pcast-pause"><i className="fa fa-pause"></i><span>Pause</span></button>
            <button className="pcast-rewind"><i className="fa fa-fast-backward"></i><span>Rewind</span></button>
            <span className="pcast-currenttime pcast-time">00:00</span>
            <progress className="pcast-progress" value="0"></progress>
            <span className="pcast-duration pcast-time">00:00</span>
            <button className="pcast-speed">1x</button>
            <button className="pcast-mute"><i className="fa fa-volume-up"></i><span>Mute/Unmute</span></button>
          </div>
          <audio src="http://s3.amazonaws.com/ShopTalk/080_rapidfire_19.mp3"></audio><a className="pcast-download" href="http://s3.amazonaws.com/ShopTalk/080_rapidfire_19.mp3" download>Download MP3</a>
        </div>
      </div>
    );
  }
}
