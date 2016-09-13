module.exports = {
  getSongName: function(song) {
    console.log('inside SongFormatter#getSongName');
    console.log('song: ', song);
    if (song.hasOwnProperty('name')) {
      return song.name
    } else {
      let urlSplit = song.url.split('/');
      return urlSplit[urlSplit.length - 1];
    }
  }
};