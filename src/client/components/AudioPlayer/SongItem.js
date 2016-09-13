import React, {Component, PropTypes} from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import classnames from 'classnames/bind';
import MenuItem from 'react-bootstrap/lib/MenuItem';
const styles = require('./audioPlayer.scss');

let cx = classnames.bind(styles);

export default class SongItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isSelected = this.props.currentSongIndex == this.props.eventKey;
    let components = [];

    if (isSelected && this.props.isPlaying) {
      components[0] = <Glyphicon className='audio-song-item-icon active' glyph='play'/>;
    } else {
      components[0] = <span className={styles.audioSongItemNotSelected}></span>;
    }

    components[1] = <span className={styles.audioSongItemLabel}>{this.props.name}</span>;

    let classes = cx({
      'audioSongItem': true,
      'active': isSelected
    });

    return (
      <MenuItem className={classes} eventKey={this.props.eventKey} onCLick={this.props.onSongItemClick}>
        { components }
      </MenuItem>
    );
  }
}