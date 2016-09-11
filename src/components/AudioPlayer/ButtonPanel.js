import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class ButtonPanel extends Component {
  constructor(props) {
    super(props);

    this.props = {
      currentSongIndex: 0,
      songCount: 0
    };
  }

  static propTypes = {
    isPlaying: PropTypes.bool,
    isPause: PropTypes.bool,
    isLoading: PropTypes.bool,
    iconName: PropTypes.string,
    iconClasses: PropTypes.string
  }

  buttonClickHandler = () => {
    console.log('inside ButtonPanel#buttonClickHandler');
    return this.isShowPlayButton ? this.props.onPlayBtnClick : this.props.onPauseBtnClick;
  }

  isShowPlayButton = () => {
    console.log('inside ButtonPanel#isShowPlayButton');
    return !this.props.isPlaying || this.props.isPause;
  }

  render() {
    const styles = require('./audioPlayer.scss');
    let isLoading = this.props.isLoading;
    let iconName, iconClasses = '';

    if (isLoading) {
      console.log('isLoading');
      console.log('changing icon name and icon classes');
      iconName = 'refresh';
      iconClasses = styles.audioRefreshAnimate;
    } else {
      console.log('isLoading is false');
      console.log('setting play or pause button');
      iconName = this.isShowPlayButton() ? 'play' : 'pause';
    }

    let songIndex = this.props.currentSongIndex;
    let buttonPanelClasses = styles.audioButtonPanel + ' pull-left';

    if (this.props.songCount < 2) {
      return (
        <ButtonGroup className={buttonPanelClasses}>
          <Button bsSize='small' onClick={this.buttonClickHandler}>
            <Glyphicon className={iconClasses} glyph={iconName} />
          </Button>
        </ButtonGroup>
      );
    } else {
      let nextButtonClass = songIndex == this.props.songCount - 1 ? 'disabled' : '';

      return (
        <ButtonGroup className={buttonPanelClasses}>
          <Button bsSize='small' onClick={this.props.onPrevBtnClick}>
            <Glyphicon glyph='step-backward'/>
          </Button>
          <Button bsSize='small' onClick={this.buttonClickHandler}>
            <Glyphicon className={iconClasses} glyph={iconName} />
          </Button>
          <Button bsSize='small' onClick={this.props.onNextBtnClick} className={nextButtonClass}>
            <Glyphicon glyph='step-forward' />
          </Button>
        </ButtonGroup>
      );
    }
  }
}
