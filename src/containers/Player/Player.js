import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Player extends Component {

  render() {
    return (
      <div className="container">
        <h1>Media Player</h1>
        <Helmet title="Player"/>

        <p>This is where the media player is going to be located</p>
        
      </div>
    );
  }
}
