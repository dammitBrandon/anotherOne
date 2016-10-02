export default function player(req) {
  return new Promise((resolve, reject) => {
    console.log('api#actions#player called: ', req);
    setTimeout(() => {
      const errors = {};
      return resolve({msg: 'player data has been saved'});
    }, 1000);
  });
}
