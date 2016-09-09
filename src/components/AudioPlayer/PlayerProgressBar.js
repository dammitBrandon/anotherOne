import React, {Component, PropTypes} from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import classnames from 'classnames';

export default class PlayerProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressStyle: {
        marginLeft: '5px'
      }
    };
  }

  static propTypes = {
    percent: PropTypes.number,
    progressStyle: PropTypes.string,
    style: PropTypes.string,
    classes: PropTypes.string
  }

  seekTo = (e) => {
    console.log("inside ProgressBar#seekTo");
    if (!this.props.percent) {
      return;
    }

    let container = $(this.refs.progressBar.getDOMNode());
    let containerStartX = container.offset().left;
    let percent = (e.clientX - containerStartX) / container.width();
    percent = percent >= 1 ? 1 : percent;
    this.props.seekTo(percent);
  }

  render() {
    let percent = this.props.percent * 100;
    let style = { width: percent + "%" };
    let classes = classnames({
      'audio-progress-container': true,
      'pull-left': true
    });

    return (
      <div ref='progressBar' className={classes} style={this.props.progressStyle} onClick={this.seekTo}>
        <div className='audio-progress' style={style}></div>
      </div>
    );
  }
}