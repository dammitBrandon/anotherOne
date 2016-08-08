import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';

export default class Player extends Component {

  render() {
    return (
      <div className="container">
        <h1>Media Player</h1>
        <Helmet title="Media Player"/>

        <p>This is where the media player is going to be located</p>

        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
          time as the info bar.</p>

        <MiniInfoBar/>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}
