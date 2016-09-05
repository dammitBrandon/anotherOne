import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class ButtonPanel extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isPlaying: PropTypes.bool,
    isPause: PropTypes.bool,
    isLoading: PropTypes.bool,
    iconName: PropTypes.string,
    iconClasses: PropTypes.string
  }

  isShowPlayButton = () => {
    console.log('inside ButtonPanel#isShowPlayButton');
    return !this.props.isPlaying || this.props.isPause;
  }

  buttonClickHandler = () => {
    console.log('inside ButtonPanel#buttonClickHandler');
    this.isShowPlayButton ? this.props.onPlayBtnClick : this.props.onPauseBtnClick;
  }

  render() {
    const { isPlaying, isPause, isLoading} = this.props; // eslint-disable-line no-shadow
    let iconName, iconClasses = '';
    let buttonPanelClasses = 'audio-button-panel pull-left';

    if (isLoading) {
      console.log('isLoading');
      console.log('changing icon name and icon classes');
      iconName = 'refresh';
      iconClasses = 'audio-refresh-animate';
    } else {
      console.log('isLoading is false');
      console.log('setting play or pause button');
      iconName = this.isShowPlayButton ? 'play' : 'pause';
    }
    return (
      <ButtonGroup className={buttonPanelClasses}>
        <Button bsSize='small' onClick={this.buttonClickHandler}>
          <Glyphicon className={iconClasses} glyph={iconName} />
        </Button>
      </ButtonGroup>
    );
  }
}
