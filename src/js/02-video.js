import Player from '@vimeo/player';// подгружаем плеер 
const _ = require('lodash');//подгружаем библиотеку тормозов

const iframe = document.querySelector('iframe'); // ищим обьект по тегу или класу
const player = new Player(iframe);//создаем обьект для управлениее найденного iframe

//считываем сохраненные данные
//проверяем напустое значение и записываем в обьект плеера сохраненный промеж времени
const sevedTime = localStorage.getItem('videoplayer-current-time');
const parsedSettings = JSON.parse(sevedTime);
const timeStart = parsedSettings ? parsedSettings : 0;
player.setCurrentTime(timeStart);

//отслеживаем и записываем временную шкалу не чаще чем 1 раз в 1000 мс
player.on(
  'timeupdate',
  _.throttle(e => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
  }, 1000)
);
