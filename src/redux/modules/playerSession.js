// Action types
const INCREMENT_PLAY_BUTTON = 'INCREMENT_PLAY_BUTTON';
const INCREMENT_PAUSE_BUTTON = 'INCREMENT_PAUSE_BUTTON';
const SEEK_TO_ACTION = 'SEEK_TO_ACTION';
const SAVE = "SAVE";
const SAVE_SUCCESS = "SAVE_SUCCESS";
const SAVE_FAILURE = "SAVE_FAILURE";


// Initial state
const initialState = {
  playButtonClickedCount: 0,
  pauseButtonClickedCount: 0,
  seekToAction: false,
  saveError: {}
};

// Action Creators
export default function reducer(state = initialState, action = {}) {
  console.log('playerSession#reducer: ', action);
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
      const {pauseButtonClickedCount} = state;
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
      return state;
    case SAVE_SUCCESS:
      console.log('SAVE_SUCCESS');
      const data = [...state.data];
      return {
        ...state,
        data: data
      };
    case SAVE_FAILURE:
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
  console.log('playerSession#incrementPlayButton');
  return {
    type: INCREMENT_PLAY_BUTTON
  };
};

export function incrementPauseButton() {
  console.log('playerSession#incrementPauseButton');
  return {
    type: INCREMENT_PAUSE_BUTTON
  };
};

export function seekToActionPerformed() {
  console.log('playerSession#seekToActionPerformed');
  return {
    type: SEEK_TO_ACTION
  };
};

export function saveSession(data) {
  console.log('playerSession#saveSession data: ', data);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAILURE],
    promise: (client) => client.post('/player', {
      data: data
    })
  };
};