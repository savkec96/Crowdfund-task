'use strict';

const bodyTag = document.querySelector('body');
const headerEl = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
function initHeaderNavIconOpen() {
  const btnNavbar = document.querySelector('.menu-btn');
  btnNavbar.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
    if (headerEl.classList.contains('nav-open')) {
      bodyTag.style.overflow = 'hidden';
    } else {
      bodyTag.style.overflow = 'visible';
    }
  });
}
initHeaderNavIconOpen();

const bookmarkBtn = document.querySelector('#bookmark');
let bookmarkText = document.querySelector('.bookmark-text');
const initBookmarkBtn = function () {
  bookmarkBtn.addEventListener('click', function () {
    this.classList.toggle('bookmark-active');
    if (this.classList.contains('bookmark-active')) {
      bookmarkText.innerHTML = 'Bookmarked';
    } else {
      bookmarkText.innerHTML = 'Bookmark';
    }
  });
};
initBookmarkBtn();

const firstModalBtn = document.querySelectorAll('.open-first-modal');
const firstModal = document.querySelector('.first-modal');
const initFirstModal = function () {
  firstModalBtn.forEach(btn =>
    btn.addEventListener('click', function () {
      firstModal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      bodyTag.style.overflow = 'hidden';
    })
  );
};
initFirstModal();

const pledgeSection = document.querySelectorAll('.pledge');
const radioButtonModal = document.querySelectorAll('.radio-btn');
const initRadioButton = function () {
  radioButtonModal.forEach(rb =>
    rb.addEventListener('click', function () {
      let pl;
      for (pl of pledgeSection) {
        if (rb.checked && pl.contains(rb)) {
          pl.classList.add('pledge-active');
        } else {
          pl.classList.remove('pledge-active');
        }
      }
    })
  );
};
initRadioButton();

let backersMoney = document.querySelector('.money-backed');
let backersNumber = document.querySelector('.number-backed');
const continueBtn = document.querySelectorAll('.open-second-modal');
const continueBtnElements = Array.from(continueBtn);
const inputNumberType = document.querySelectorAll('.number-input');
const inputNumberElements = Array.from(inputNumberType);
const secondModal = document.querySelector('.second-modal');
let successBar = document.querySelector('.success-bar');
const amountCalculate = function () {
  let bMoney, bNumber;
  for (let i = 0; i < continueBtnElements.length; i++) {
    continueBtnElements[i].addEventListener('click', function () {
      bMoney = parseInt(backersMoney.textContent.slice(1));
      bNumber = parseInt(backersNumber.textContent);
      const amount = Number(inputNumberElements[i].value);
      if (
        inputNumberElements[i].value < inputNumberElements[i].min ||
        inputNumberElements[i].value > 100000 - bMoney
      ) {
        alert(
          `Something went wrong. You need to add a value a minimum of ${
            inputNumberElements[i].min
          }$, and a maximum of ${
            100000 - bMoney
          } and the value has to be a number!`
        );
      } else {
        bMoney += amount;
        bNumber++;
        backersMoney.textContent = `$${bMoney}`;
        backersNumber.textContent = `${bNumber}`;
        successBar.style.width = `${bMoney / 1000}%`;
        firstModal.classList.add('hidden');
        secondModal.classList.remove('hidden');
      }
    });
  }
};
amountCalculate();

const closeFirstModal = document.querySelector('.close-first-modal');
const closeSecondModal = document.querySelector('.close-second-modal');
const initCloseModal = function (modalBtn, modalName) {
  modalBtn.addEventListener('click', function () {
    modalName.classList.add('hidden');
    overlay.classList.add('hidden');
    bodyTag.style.overflow = 'visible';
    radioButtonModal.forEach(rbt => (rbt.checked = false));
    pledgeSection.forEach(ple => ple.classList.remove('pledge-active'));
    inputNumberType.forEach(inpT => (inpT.value = inpT.min));
  });
};
initCloseModal(closeFirstModal, firstModal);
initCloseModal(closeSecondModal, secondModal);
