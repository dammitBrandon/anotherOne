import React, {Component, PropTypes} from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import classnames from 'classnames/bind';
const styles = require('./audioPlayer.scss');

let cx = classnames.bind(styles);

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

    let container = $(this.refs.playerProgressBar.getDOMNode());
    let containerStartX = container.offset().left;
    let percent = (e.clientX - containerStartX) / container.width();
    percent = percent >= 1 ? 1 : percent;
    this.props.seekTo(percent);
  }

  render() {
    const styles = require('./audioPlayer.scss');
    let percent = this.props.percent * 100;
    let style = { width: percent + "%" };
    let classes = cx({
      'audioProgressContainer': true,
      'pull-left': true
    });

    return (
      <div ref='playerProgressBar' className={classes} style={this.props.progressStyle} onClick={this.seekTo}>
        <div className={styles.audioProgress} style={style}></div>
      </div>
    );
  }
}