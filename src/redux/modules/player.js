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
  switch (action.type) {
    case INCREMENT_PLAY_BUTTON:
      const {playButtonClickedCount} = state;
      return {
        ...state,
        playButtonClickedCount: playButtonClickedCount + 1
      };
    case INCREMENT_PAUSE_BUTTON:
      const { pauseButtonClickedCount } = state;
      return {
        ...state,
        pauseButtonClickedCount: pauseButtonClickedCount + 1
      };
    case SEEK_TO_ACTION:
      return {
        ...state,
        seekToAction: true
      };
    case SAVE:
      return {...state};
    case SAVE_SUCCESS:
      const data = [...state.data];
      return {
        ...state,
        data: data
      };
    case SAVE_FAIL:
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
  return {
    type: INCREMENT_PLAY_BUTTON
  };
};

export function incrementPauseButton() {
  return {
    type: INCREMENT_PAUSE_BUTTON
  };
};

export function seekToActionPerformed() {
  return {
    type: SEEK_TO_ACTION
  };
};

function recievePlayerData(playerData) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    playerData
  }
}

// export function save(playbackData){
//   return dispatch => {
//     return $.ajax({
//       type: 'POST',
//       url: '/player',
//       data: playbackData
//     })
//     .then(playerData => {
//
//       dispatch(recievePlayerData(playerData));
//     })
//   }
// };

export function save(playbackData){
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/player', {
      data: {
        playbackData: playbackData
      }
    })
  };
}