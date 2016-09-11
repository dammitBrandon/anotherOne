import React, {Component, PropTypes} from 'react';
import DropDownButton from 'react-bootstrap/lib/DropdownButton';
import SongItem from './SongItem';
import SongFormatter from './../../utils/SongFormatter';

export default class SongList extends Component {
  constructor(props) {
    super(props);
  }

  hideDropdownMenu = () => {
    console.log('SongList#hideDropdownMenu');
    this.refs.dropdownButton.setDropdownState(false);
  }

 render() {
   const styles = require('./audioPlayer.scss');
   let songs = [];
   let currentSongIndex = this.props.currentSongIndex;
   let isPlaying = this.props.isPlaying;
   let isPause = this.props.isPause;
   let songCount = this.props.songs.length;

   songs = this.props.songs.maps(function(song, index) {
     let songName = SongFormatter.getSongName(song);
     songName = songCount > 1 ? (index + 1) + '. ' + songName : songName;

     return <SongItem currentSongIndex={currentSongIndex}
                      eventKey={index}
                      name={songName}
                      isPlaying={isPlaying}
                      isPause={isPause}
                      onSongItemClick={this.props.onSongItemClick.bind(null, index)} />;
   }, this);

   return (
     <div className={styles.audioSongsList}>
       <DropDownButton ref='dropdownButton'>
         {songs}
       </DropDownButton>
     </div>
   );
 }
}