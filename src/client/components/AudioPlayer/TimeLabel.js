import React, {Component, PropTypes} from 'react';
import TimeFormatter from './../../utils/TimeFormatter';

export default class TimeLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./audioPlayer.scss');

    if (this.props.seek == undefined || !this.props.duration) {
      return (
        <span></span>
      );
    }

    let seek = TimeFormatter.secondsToTime(this.props.seek);
    let duration = TimeFormatter.secondsToTime(this.props.duration);

    return (
      <span className={styles.audioTime + ' pull-right'}>{seek} / {duration}</span>
    );
  }
}