import React, {Component, PropType} from 'react';
import Label from 'react-bootstrap/lib/Label';

export default class NameLabel extends Component {
  render() {
    const styles = require('./audioPlayer.scss');
    return (
      <span className={styles.audioNameLabel + ' pull-left'}>{this.props.name}</span>
    );
  }
}