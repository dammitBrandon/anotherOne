import React, {Component, PropTypes} from 'react';
import TimeFormatter from './../../utils/TimeFormatter';

export default class TimeLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = 'audio-time pull-right';

    if (this.props.seek == undefined || !this.props.duration) {
      return (
        <span></span>
      );
    }

    let seek = TimeFormatter(this.props.seek);
    let duration = TimeFormatter(this.props.duration);

    return (
      <span className={classes}>{seek} / {duration}</span>
    );
  }
}