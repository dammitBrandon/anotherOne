import React, {Component, PropTypes} from 'react';
import classnames from 'classnames/bind';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import $ from 'jquery';
const styles = require('./audioPlayer.scss');

let uniqueId = 0;
let cx = classnames.bind(styles);

export default class VolumeBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true
    };
  }

  toggle = () => {
    console.log('VolumeBar#toggle');
    if (this.isToggleBtnPress) {
      this.isToggleBtnPress = false;
      return;
    }

    let hide = !this.state.hide;
    if (hide) {
      return;
    }

    this.setState({ hide: false });
    this.globalClickHandler  = $(document).mousedown(function(e) {
      let reactId = this.refs.audioVolumeBarContainer.props.id;
      let toggleBtnReactId = this.refs.toggleButton.props.id;
      let node = e.target;
      while(node != null) {
        let nodeReactId = $(node).context.id;
        if (reactId == nodeReactId) {
          return;
        } else if (toggleBtnReactId == nodeReactId) {
          this.isToggleBtnPress = true;
          break;
        }
        node = node.parentNode;
      }
      this.globalClickHandler.unbind();
      this.globalClickHandler = null;
      this.setState({ hide: true });
    }.bind(this));
  }

  adjustVolumeTo = (e) => {
    console.log('VolumeBar#adjustVolumeTo');
    let container = $(this.refs.audioVolumePercentContainer.getDOMNode());
    let containerStartY = container.offset().top;
    let percent = (e.clientY - containerStartY) / container.height();
    percent = 1 - percent;
    this.props.adjustVolumeTo(percent);
  }

  volumeToMax = () => {
    console.log('VolumeBar#volumeToMax');
    this.props.adjustVolumeTo(1);
  }

  volumeToMin = () => {
    console.log('VolumeBar#volumeToMin');
    this.props.adjustVolumeTo(0);
  }

  render() {
    let percent = this.props.volume * 100;
    let style = {top: (100 - percent) + '%'};
    let toggleIcon = this.props.volume == 0 ? 'volume-off' : 'volume-up';
    let audioVolumeBarClasses = cx({
      'audioVolumeBar': true,
      'audioVolumeBarHide': this.state.hide
    });

    let audioVolumeBarContainerId = 'audioVolumeBarContainerId' + ++uniqueId;
    let toggleBtnId = 'toggleBtn' + ++uniqueId;

    return (
      <div id={audioVolumeBarContainerId} ref='audioVolumeBarContainer' className={styles.audioVolumeBarContainer}>
        <Button id={toggleBtnId} ref='toggleButton' bsSize='small' onClick={this.toggle}>
          <Glyphicon glyph={toggleIcon}/>
        </Button>
        <div className={audioVolumeBarClasses}>
          <div className={styles.audioVolumeMinMax} onClick={this.volumeToMax}>
            <Glyphicon glyph='volume-up'/>
          </div>
          <div ref='audioVolumePercentContainer' className={styles.audioVolumePercentContainer} onClick={this.adjustVolumeTo}>
            <div className={styles.audioVolumePercent} style={style}></div>
          </div>
          <div className={styles.audioVolumeMinMax} onClick={this.volumeToMin}>
            <Glyphicon glyph='volume-off' />
          </div>
        </div>
      </div>
    );
  }
}
