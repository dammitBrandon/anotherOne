import React, {Component, PropTypes} from 'react';
import ButtonPanel from './ButtonPanel';
import PlayerProgressBar from './PlayerProgressBar';
import VolumeBar from './VolumeBar';
import TimeLabel from './TimeLabel';
import NameLabel from './NameLabel';
import SongList from './SongList';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as playerSessionActions from 'redux/modules/player';
import Howler from 'howler';
import SongFormatter from './../../utils/SongFormatter';
import $ from 'jquery';

const Howl = Howler.Howl;

@connect(
  state => ({playButtonClickedCount: state.player.playButtonClickedCount, pauseButtonClickedCount: state.player.pauseButtonClickedCount}),
  dispatch => bindActionCreators(playerSessionActions, dispatch)
)
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

    this.props = {
      songs: []
    };
  };

  static propTypes = {
    songs: PropTypes.array,
    playButtonClickedCount: PropTypes.number,
    pauseButtonClickedCount: PropTypes.number,
    incrementPlayButton: PropTypes.func.isRequired,
    incrementPauseButton: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    console.log('AudioPlayer#componentWillMount');

    if (this.props.dataUrl) {
      $.ajax({
        dataType: 'json',
        url: this.props.dataUrl,
        success: function(response) {
          this.setState({
            songs: response.songs,
            currentSongIndex: 0
          });
        }.bind(this)
      });
    } else if (this.props.songs) {
      this.setState({
        songs: this.props.songs,
        currentSongIndex: 0
      });
    } else {
      throw "no data";
    }
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    console.log('AudioPlayer#componentDidUpdate');
    if (this.state.isPlaying && this.state.currentSongIndex != prevState.currentSongIndex) {
      this.initSoundObject();
    }
  }

  componentWillUnmount = () => {
    console.log('AudioPlayer#componentWillUnmount');
    this.props.save({playButtonClicked: this.props.playButtonClickedCount, pauseButtonClicked: this.props.pauseButtonClickedCount});
  }

  onPlayBtnClick = () => {
    console.log('AudioPlayer#onPlayBtnClick');
    this.props.incrementPlayButton();
    if (this.state.isPlaying && !this.state.isPause) {
      return;
    }
    this.play();
  }

  onPauseBtnClick = () => {
    console.log('AudioPlayer#onPauseBtnClick');
    this.props.incrementPauseButton();
    let isPause = !this.state.isPause;
    this.setState({ isPause: isPause });
    isPause ? this.pause() : this._play();
  }

  onPrevBtnClick = () => {
    console.log('AudioPlayer#onPrevBtnClick');
    this.prev();
  }

  onNextBtnClick = () => {
    console.log('AudioPlayer#onNextBtnClick');
    this.next();
  }

  onSongItemClick = () => {
    // handle pause / playing state
    console.log('AudioPlayer#onSongItemClick');
    if (this.state.currentSongIndex == songIndex) {
      if (this.state.isPause) {
        this.onPauseBtnClick();
        this.refs.songList.hideDropdownMenu();
      } else if (!this.state.isPlaying) {
        this.onPlayBtnClick();
        this.refs.songList.hideDropdownMenu();
      }
      return;
    }

    // handle index change state, it must change to play.
    this.stop();
    this.clearSoundObject();
    this.setState({
      currentSongIndex: songIndex,
      duration: 0,
      isPlaying: true,
      isPause: false
    });
    this.refs.songlist.hideDropdownMenu();
  }

  play = () => {
    console.log('AudioPlayer#play');
    this.setState({ isPlaying: true, isPause: false });

    if (!this.howler) {
      this.initSoundObject();
    } else {
      let songUrl = this.state.songs[this.state.currentSongIndex].url;
      if (songUrl != this.howler._src) {
        this.initSoundObject();
      } else {
        this._play();
      }
    }
  }

  initSoundObject = () => {
    console.log('AudioPlayer#initSoundObject');
    this.clearSoundObject();
    this.setState({ isLoading: true });

    let song = this.state.songs[this.state.currentSongIndex];
    this.howler = new Howl({
      src: song.url,
      volume: this.state.volume,
      onload: this.initSoundObjectCompleted,
      onend: this.playEnd
    });
  }

  clearSoundObject = () => {
    console.log('AudioPlayer#clearSoundObject');
    if (this.howler) {
      this.howler.stop();
      this.howler = null;
    }
  }

  initSoundObjectCompleted = () => {
    console.log('AudioPlayer#initSoundObjectCompleted');
    this._play();
    this.setState({
      duration: this.howler.duration(),
      isLoading: false
    });
  }

  _play = () => {
    console.log('AudioPlayer#_play');
    this.howler.play();
    this.stopUpdateCurrentDuration();
    this.updateCurrentDuration();
    this.interval = setInterval(this.updateCurrentDuration, 1000);
  }

  playEnd = () => {
    console.log('AudioPlayer#playEnd');
    if (this.state.currentSongIndex == this.state.song.length - 1) {
      this.stop();
    } else {
      this.next();
    }
  }

  stop = () => {
    console.log('AudioPlayer#stop');
    this.stopUpdateCurrentDuration();
    this.setState({ seek: 0, isPlaying: false });
  }

  pause = () => {
    console.log('AudioPlayer#pause');
    this.howler.pause();
    this.stopUpdateCurrentDuration();
  }

  prev = () => {
    console.log('AudioPlayer#prev');
    if (this.state.seek > 1 || this.state.currentSongIndex == 0) {
      this.seekTo(0);
    } else {
      this.updateSongIndex(this.state.currentSongIndex - 1);
    }
  }

  next = () => {
    console.log('AudioPlayer#next');
    this.updateSongIndex(this.state.currentSongIndex + 1);
  }

  updateCurrentSongIndex = () => {
    console.log('AudioPlayer#updateCurrentSongIndex');
    this.setState({
      currentSongIndex: index,
      duration: 0
    });

    if (this.state.isPause) {
      this.stop();
      this.clearSoundObject();
    } else {
      this.stopUpdateCurrentDuration();
    }
  }

  updateCurrentDuration = () => {
    console.log('AudioPlayer#updateCurrentDuration');
    this.setState({ seek: this.howler.seek() });
  }

  stopUpdateCurrentDuration = () => {
    console.log('AudioPlayer#stopUpdateCurrentDuration');
    clearInterval(this.interval);
  };

  seekTo = (percent) => {
    console.log('AudioPlayer#seekTo');
    let seek = this.state.duration * percent;
    this.howler.seek(seek);
    this.setState({ seek: seek });
  }

  adjustVolumeTo = (percent) => {
    console.log('AudioPlayer#adjustVolumeTo');
    this.setState({ volume: percent });
    if (this.howler) {
      this.howler.volume(percent);
    }
  }

  songCount = () => {
    console.log('AudioPlayer#songCount');
    return this.state.songs ? this.state.songs.length : 0;
  }

  getCurrentSongName = () => {
    console.log('AudioPlayer#getCurrentSongName');
    if (this.state.currentSongIndex < 0) {
      return '';
    }
    let song = this.state.songs[this.state.currentSongIndex];
    return SongFormatter.getSongName(song);
  }

  render() {
    const styles = require('./audioPlayer.scss');
    let songCount = this.songCount();
    let percent = 0;
    const {songs} = this.props; // eslint-disable-line no-shadow

    console.log('this.state.seek: ', this.state.seek);
    console.log('this.state.duration: ', this.state.duration);
    if (this.state.seek && this.state.duration) {
      percent = this.state.seek / this.state.duration;
    }

    let topComponents = [
      <ButtonPanel isPlaying={this.state.isPlaying} isPause={this.state.isPause}
        isLoading={this.state.isLoading}
        currentSongIndex={this.state.currentSongIndex} songCount={songCount}
        onPlayBtnClick={this.onPlayBtnClick} onPauseBtnClick={this.onPauseBtnClick}
        onPrevBtnClick={this.onPrevBtnClick} onNextBtnClick={this.onNextBtnClick} />,
      <PlayerProgressBar shorter={songCount > 1} percent={percent} seekTo={this.seekTo} />,
      <VolumeBar volume={this.state.volume} adjustVolumeTo={this.adjustVolumeTo} />
    ];

    let songName;
    if (this.songCount() > 1) {
      topComponents.push(
        <SongList ref='songList' className='pull-left'
          songs={this.state.songs}
          currentSongIndex={this.state.currentSongIndex} isPause={this.state.isPause}
          onSongItemClick={this.onSongItemClick} />
      );
      songName = (this.state.currentSongIndex + 1) + ". " + this.getCurrentSongName();
    } else {
      songName = this.getCurrentSongName();
    }

    return (
     <div className={styles.audioPlayer}>
       <div className='clearfix'>
         { topComponents }
       </div>

       <div className={styles.audioDescContainer +  ' clearfix'}>
         <NameLabel name={songName} />
         <TimeLabel seek={this.state.seek} duration={this.state.duration} />
       </div>
      <span>pauseClicked: {this.props.pauseButtonClickedCount}</span>
      <br/>
      <span>playClicked: {this.props.playButtonClickedCount}</span>
     </div>
    );
  }
}