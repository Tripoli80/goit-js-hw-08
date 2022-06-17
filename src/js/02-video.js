import Player from '@vimeo/player'; // подгружаем плеер

const throttle = require('lodash.throttle'); //подгружаем библиотеку тормозов

const iframe = document.querySelector('iframe'); // ищим обьект по тегу или класу
const player = new Player(iframe); //создаем обьект для управлениее найденного iframe
const SAVETIMEKEY = 'videoplayer-current-time';
//считываем сохраненные данные
//проверяем напустое значение и записываем в обьект плеера сохраненный промеж времени
const sevedTime = localStorage.getItem(SAVETIMEKEY);
const parsedSettings = JSON.parse(sevedTime);
const timeStart = parsedSettings ? parsedSettings : 0;
player.setCurrentTime(timeStart);

//отслеживаем и записываем временную шкалу не чаще чем 1 раз в 1000 мс
player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem(SAVETIMEKEY, JSON.stringify(e.seconds));
    console.log(SAVETIMEKEY);
  }, 1000)
);
