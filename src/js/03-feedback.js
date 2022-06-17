const throttle = require('lodash.throttle'); //подгружаем библиотеку тормозов
const validator = require('validator');
const form = document.querySelector('.feedback-form');
const TEMPSTRING = 'feedback-form-state';

const data = {};
form.addEventListener('input', throttle(savedInputForm, 500));
readAndWrite();
//read data & write data
function readAndWrite() {
  try {
    const tempRead = localStorage.getItem(TEMPSTRING);
    const readData = JSON.parse(tempRead);
    // readData.email="asdas";
    data.email = readData.email;
    data.message = readData.message;
  } catch (error) {
    data.email = '';
    data.message = '';
  }
  form.email.value = data.email;
  form.message.value = data.message;
}
function savedInputForm(e) {
  if (e.target.name !== 'email' && e.target.name !== 'message') {
    return;
  }
  const keyName = e.target.name;
  data[keyName] = e.target.value;
  localStorage.setItem(TEMPSTRING, JSON.stringify(data));
}

form.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  e.preventDefault();

  if (validator.isEmail(data.email)) {
    console.log('send data to server');
    console.table(data);
    localStorage.removeItem(TEMPSTRING);
    readAndWrite();
  } else {
    alert('E-mail not correct!');
  }
});
