const _ = require('lodash'); //подгружаем библиотеку тормозов
const form = document.querySelector('.feedback-form');
form.addEventListener('input', _.throttle(savedInputForm, 500));
const data = {};
//read data & write data
try {
  const tempRead = localStorage.getItem('feedback-form-state');
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

function savedInputForm(e) {
  if (e.target.name !== 'email' && e.target.name !== 'message') {
    return;
  }
  const keyName = e.target.name;
  data[keyName] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}
form.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  console.log('send data to server');
  console.table(data);
  localStorage.clear();
});
