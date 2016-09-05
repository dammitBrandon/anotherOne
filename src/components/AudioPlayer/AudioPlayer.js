import React, {Component, PropTypes} from 'react';
import ButtonPanel from './ButtonPanel';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isPause: false,
      isLoading: false,
      currentSongIndex: -1,
      volume: 0.5
    };
  }

  render() {
   return (
     <ButtonPanel isPlaying={this.state.isPlaying} isPause={this.state.isPause}
                  isLoading={this.state.isLoading}
                  currentSongIndex={this.state.currentSongIndex} />
   );
  }
}