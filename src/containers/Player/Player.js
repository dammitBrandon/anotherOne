import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {AudioPlayer} from 'components';
// import songs from './../../data/songs.json';

export default class Player extends Component {
  componentWillMount = () => {
    console.log('AudioPlayer#componentWillMount');
  }

  render() {
    let songs = [
      {
        name: 'song1',
        url: 'http://s3.amazonaws.com/ShopTalk/080_rapidfire_19.mp3'
      }
    ];
    return (
      <div className="container">
        <Helmet title="Player"/>
        <h1>Media Player</h1>

        <AudioPlayer songs={songs} />
      </div>
    );
  }
}