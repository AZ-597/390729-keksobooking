'use strict';

var adHouseType = document.querySelector('#type');
var adPrice = document.querySelector('#price');

var adHouseTypeMinPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var onAdHouseTypeChange = function (evt) {
  var target = evt.target;
  adPrice.min = adPrice.placeholder = adHouseTypeMinPrice[target.value];
};

adHouseType.addEventListener('change', onAdHouseTypeChange);

/*
var onAdHouseTypeChange = function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'bungalo':
      adPrice.min = adPrice.placeholder = 0;
      break;
    case 'flat':
      adPrice.min = adPrice.placeholder = 1000;
      break;
    case 'house':
      adPrice.min = adPrice.placeholder = 5000;
      break;
    case 'palace':
      adPrice.min = adPrice.placeholder = 10000;
      break;
    default:
      adPrice.min = adPrice.placeholder = 0;
      break;
  }
};
*/


// ------------------------------------------------------ //
/*
var adTimein = document.querySelector('#timein');
var adTimeout = document.querySelector('#timeout');

var onAdTimeinChange = function (evt) {
  var target = evt.target;
  if (target.value !== adTimeout.value) {
    adTimeout.value = target.value;
  }
};
var onAdTimeoutChange = function (evt) {
  var target = evt.target;
  if (target.value !== adTimein.value) {
    adTimein.value = target.value;
  }
};

adTimein.addEventListener('change', onAdTimeinChange);
adTimeout.addEventListener('change', onAdTimeoutChange);
*/
// *************** //
var adTimeInOut = document.querySelectorAll('#timein, #timeout');

var onAdTimeInOutChange = function (evt) {
  var target = evt.target;
  adTimeInOut.forEach(function (input) {
    input.value = target.value;
  });
};

adTimeInOut.forEach(function (input) {
  input.addEventListener('change', onAdTimeInOutChange);
});

// ------------------------------------------------------ //
var adRoomNumber = document.querySelector('#room_number');
var adHouseCapacity = document.querySelector('#capacity');

var onAdRoomNumberChange = function (evt) {
  var target = evt.target;
  if (target.value < adHouseCapacity.value) {
    adHouseCapacity.setCustomValidity('rooms less then guests!');
    console.log('rooms less then guests!')
  } else if (target.value > 3) {
    adHouseCapacity.setCustomValidity('not for guests!');
    console.log('not for guests!')
  }
};

adRoomNumber.addEventListener('change', onAdRoomNumberChange);
