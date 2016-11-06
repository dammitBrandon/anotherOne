export default function player(req) {
 console.log('player action from the api');

  return Promise.resolve({msg: 'player data received at api'});
}
