// main js

function checkFieldName(value) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^[A-Za-zА-Яа-яЁё\- s]+$/);
  if (!!reg1 || !reg2) return true;
}

function checkFieldAdress(value) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^[A-Za-zА-Яа-яЁё0-9\-. s]+$/);
  if (!!reg1 || !reg2) return true;
}

function checkFieldTel(value) {
  const reg1 = value.match(/^\s+$/);
  const reg2 = value.match(/^[0-9\-\(\)+ s]+$/);
  if (!!reg1 || !reg2) return true;
}

const mainEl = document.querySelector('#main-js');
const selectBtnEl = document.querySelector('#select-btn-js');
const productsEl = document.querySelector('#products-js');
const buyBtnsEl = document.querySelectorAll('#buy-btn-js');
const checkoutEl = document.querySelector('#checkout-js');
const formEl = document.querySelector('#form-checkout');
const submitBtnEl = document.querySelector('#submit-btn-js');

const popupMark = `
  <div class="mainPopup">
    <p class="text">Спасибо за заказ</p>
  </div>
`;

selectBtnEl.addEventListener('click', () => productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }));

buyBtnsEl.forEach((el) => el.addEventListener('click', () => checkoutEl.scrollIntoView({ behavior: 'smooth', block: 'start' })))

document.getElementsByName('name')[0].addEventListener('keyup', (e) => {
  const value = e.target.value;
  const reg = value.match(/\.+/);

  if (!!reg) e.target.value = '';
  //if (!!reg) e.preventDefault();
  else return;
});

formEl.addEventListener('change', () => submitBtnEl.classList.remove('checkout__button_cursor_err'));

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  let reg = null;

  Array.from(formEl.elements)
    .forEach(element => {
      const { name, value } = element;

      if (name === 'name' && checkFieldName(value)) reg = true;
      if (name === 'adress' && checkFieldAdress(value)) reg = true;
      if (name === 'tel' && checkFieldTel(value)) reg = true;
    });

  if (reg) {
    submitBtnEl.classList.add('checkout__button_cursor_err');
    return;
  }

  submitBtnEl.classList.add('checkout__button_cursor_load');

  const data = new FormData(formEl);
  const res = await sendData(data);
  console.log(res);

  if (res.status === 'ok') {
    mainEl.insertAdjacentHTML('beforeend', popupMark);
    e.target.reset();
    submitBtnEl.classList.remove('checkout__button_cursor_load');

    setTimeout(() => {
      document.querySelector('.mainPopup').remove();
    }, 3000);
  }
});

async function sendData(data) {
  const newData = Array.from(data.entries());

  return await new Promise((res, err) => setTimeout(() => res({ status: 'ok', data: newData }), 600));
}
