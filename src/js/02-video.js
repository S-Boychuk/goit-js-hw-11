import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
player.on('loaded', onLoaded);

function onTimeUpdate({ seconds }) {
  try {
    localStorage.setItem('videoplayer-current-time', seconds);
  } catch ({ name, message }) {
    console.log(name);
    console.log(message);
  }
}

function onLoaded() {
  const saveTime = localStorage.getItem('videoplayer-current-time');

  if (saveTime) {
    player.setCurrentTime(saveTime).catch(function ({ name, message }) {
      console.log(name);
      console.log(message);
    });
  }
}
