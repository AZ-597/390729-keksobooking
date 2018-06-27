'use strict';

// Деактивированное состояние -- полностью блокируем форму
var appointDisabledState = function (state, arr) {
  for (var i = 0; i < arr.length; i++) {
    var fieldset = arr[i];
    fieldset.disabled = state;
  }
};

var adForm = document.querySelector('.ad-form');
var adFormFieldSets = adForm.querySelectorAll('fieldset');
appointDisabledState(true, adFormFieldSets);


// Активация
var mapPinMain = document.querySelector('.map__pin--main');
var mapEl = document.querySelector('.map');

var activateApp = function () {
  mapEl.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');
  appointDisabledState(false, adFormFieldSets);
};

var getPinPosition = function (evt) {
  var target = evt.currentTarget;

  var width = target.offsetWidth;
  var height = target.offsetHeight;
  var positionX = parseInt(target.style.left, 10) + width / 2;
  var positionY = parseInt(target.style.top, 10) - height;

  return positionX + ', ' + positionY;
};

var fillAddress = function (evt) {
  var addressField = adForm.querySelector('#address');
  addressField.value = getPinPosition(evt);
};

var renderPins = function (arr) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var child = createNewPin(arr[i].offer.title, arr[i].author.avatar, arr[i].location.x, arr[i].location.y);
    var data = arr[i];
    var onMapPinClick = function () { // <<<---------------------?
      createCard(data);
    };
    child.addEventListener('click', onMapPinClick); // <<<---------------------?
    fragment.appendChild(child);
  }
  mapPins.appendChild(fragment);
};

var onMapPinMainMouseup = function (evt) {
  activateApp();
  fillAddress(evt);
  renderPins(mockData);
};

mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);
