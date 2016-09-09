import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

let uniqueId = 0;

export default class VolumeBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true
    };
  }

  toggle = () => {
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
      node = e.target;
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
    let container = $(this.refs.audioVolumePercentContainer.getDOMNode());
    let containerStartY = container.offset().top;
    let percent = (e.clientY - containerStartY) / container.height();
    percent = 1 - percent;
    this.props.adjustVolumeTo(percent);
  }

  volumeToMax = () => {
    this.props.adjustVolumeTo(1);
  }

  volumeToMin = () => {
    this.props.adjustVolumeTo(0);
  }

  render() {
    let percent = this.props.volume * 100;
    let style = {top: (100 - percent) + '%'};
    let toggleIcon = this.props.volume == 0 ? 'volume-off' : 'volume-up';
    let audioVolumeBarClasses = classnames({
      'audio-volume-bar': true,
      'audio-volume-bar-hide': this.state.hide
    });

    let audioVolumeBarContainerId = 'audioVolumeBarContainerId' + ++uniqueId;
    let toggleBtnId = 'toggleBtn' + ++uniqueId;

    return (
      <div id={audioVolumeBarContainerId} ref='audioVolumeBarContainer' className='audio-volume-bar-container'>
        <Button id={toggleBtnId} ref='toggleButton' bsSize='small' onClick={this.toggle}>
          <Glyphicon glyph={toggleIcon}/>
        </Button>
        <div className={audioVolumeBarClasses}>
          <div className='audio-volume-min-max' onClick={this.volumeToMax}>
            <Glyphicon glyph='volume-up'/>
          </div>
          <div ref='audioVolumePercentContainer' className='audio-volume-percent-container' onClick={this.adjustVolumeTo}>
            <div className='audio-volume-percent' style={style}></div>
          </div>
          <div className='audio-volume-min-max' onClick={this.volumeToMin}>
            <Glyphicon glyph='volume-off' />
          </div>
        </div>
      </div>
    );
  }
}
