import React, {Component} from 'react';
import { AudioPlayer } from 'components';
import Helmet from 'react-helmet';

export default class Player extends Component {
  playPlayer = () => {
    console.log('clicked player button');
  }
  render() {
    return (
      <div className="container">
        <Helmet title="Player"/>
        <h1>Media Player</h1>

        <AudioPlayer/>
      </div>
    );
  }
}
