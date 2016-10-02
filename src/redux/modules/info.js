const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
  console.log('info#reducer: ', action);
  console.log('info#state: ', state);
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  console.log('info#isLoaded, globalState: ', globalState);
  return globalState.info && globalState.info.loaded;
}

export function load() {
  console.log('info#load');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadInfo')
  };
}
