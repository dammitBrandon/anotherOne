import $ from 'jquery';
// Action types
const INCREMENT_PLAY_BUTTON = 'player/INCREMENT_PLAY_BUTTON';
const INCREMENT_PAUSE_BUTTON = 'player/INCREMENT_PAUSE_BUTTON';
const SEEK_TO_ACTION = 'player/SEEK_TO_ACTION';
const SAVE = "player/SAVE";
const SAVE_SUCCESS = "player/SAVE_SUCCESS";
const SAVE_FAIL = "player/SAVE_FAIL";

// Initial state
const initialState = {
  playButtonClickedCount: 0,
  pauseButtonClickedCount: 0,
  seekToAction: false,
  saveError: {}
};

// Action Creators
export default function reducer(state = initialState, action = {}) {
  console.log('player#reducer: ', action);
  console.log('player#state: ', state);
  switch (action.type) {
    case INCREMENT_PLAY_BUTTON:
      console.log('INCREMENT_PLAY_BUTTON');
      const {playButtonClickedCount} = state;
      return {
        ...state,
        playButtonClickedCount: playButtonClickedCount + 1
      };
    case INCREMENT_PAUSE_BUTTON:
      console.log('INCREMENT_PAUSE_BUTTON');
      const { pauseButtonClickedCount } = state;
      return {
        ...state,
        pauseButtonClickedCount: pauseButtonClickedCount + 1
      };
    case SEEK_TO_ACTION:
      console.log('SEEK_TO_ACTION');
      return {
        ...state,
        seekToAction: true
      };
    case SAVE:
      console.log('SAVE');
      return {...state};
    case SAVE_SUCCESS:
      console.log('SAVE_SUCCESS');
      const data = [...state.data];
      return {
        ...state,
        data: data
      };
    case SAVE_FAIL:
      console.log('SAVE_FAILURE');
      return {
        ...state,
        saveError: {
          message: 'failed'
        }
      };
    default:
      return state;
  }
};

export function incrementPlayButton() {
  console.log('player#incrementPlayButton');
  return {
    type: INCREMENT_PLAY_BUTTON
  };
};

export function incrementPauseButton() {
  console.log('player#incrementPauseButton');
  return {
    type: INCREMENT_PAUSE_BUTTON
  };
};

export function seekToActionPerformed() {
  console.log('player#seekToActionPerformed');
  return {
    type: SEEK_TO_ACTION
  };
};

function recievePlayerData(playerData) {
  console.log(playerData);
  return {
    type: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    playerData
  }
}

export function save(playbackData){
  return dispatch => {
    console.log('player#save data: ', playbackData);
    return $.ajax({
      type: 'POST',
      url: '/player',
      data: playbackData
    })
    .then(playerData => {
      console.log('dispatch playerData:', playerData);

      dispatch(recievePlayerData(playerData));
    })
  }
};
