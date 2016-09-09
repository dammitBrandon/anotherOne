import React, {Component, PropType} from 'react';
import Label from 'react-bootstrap/lib/Label';

export default class NameLabel extends Component {
  render() {
    return (
      <span className='audio-name-label pull-left'>{this.props.name}</span>
    );
  }
}