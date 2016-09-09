import React, {Component, PropTypes} from 'react';
import ButtonPanel from './ButtonPanel';
import PlayerProgressBar from './PlayerProgressBar';
import VolumeBar from './VolumeBar';
import TimeLabel from './TimeLabel';
import NameLabel from './NameLabel';
import SongList from './SongList';
import SongFormatter from './../../utils/SongFormatter';

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

  componentWillMount() {

  }

  componentDidUpdate() {

  }

  render() {
    let percent = 0;

    if (this.state.seek && this.state.duration) {
      percent = this.state.seek / this.state.duration;
    }

    return (
     <div>
       <ButtonPanel isPlaying={this.state.isPlaying} isPause={this.state.isPause}
                    isLoading={this.state.isLoading}
                    currentSongIndex={this.state.currentSongIndex} />
       <PlayerProgressBar percent={percent} seekTo={this.seekTo} />
     </div>
    );
  }
}