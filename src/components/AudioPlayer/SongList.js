import React, {Component, PropTypes} from 'react';
import DropDownButton from 'react-bootstrap/lib/DropdownButton';
import SongItem from './SongItem';
import SongFormatter from './../../utils/SongFormatter';

export default class SongList extends Component {
  constructor(props) {
    super(props);
  }

  hideDropdownMenu = () => {
    this.refs.dropdownButton.setDropdownState(false);
  }

 render() {
   let songs = [];
   let currentSongIndex = this.props.currentSongIndex;
   let isPlaying = this.props.isPlaying;
   let isPause = this.props.isPause;
   let songCount = this.props.songs.length;

   songs = this.props.songs.maps(function(song, index) {
     let songName = SongFormatter.getSongName(song);
     songName = songCount > 1 ? (index + 1) + '. ' + songName : songName;

     return <SongItem currentSongIndex={currentSongIndexs}
                      eventKey={index}
                      name={songName}
                      isPlaying={isPlaying}
                      isPause={isPause}
                      onSongItemClick={this.props.onSongItemClick.bind(null, index)} />;
   }, this);

   return (
     <div className='audio-songs-list'>
       <DropDownButton ref='dropdownButton'>
         {songs}
       </DropDownButton>
     </div>
   );
 }
}