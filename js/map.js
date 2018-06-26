'use strict';

/* ------------------- Part 1 ------------------- */

var OFFER_TITLE_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var OFFER_PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// Генератор случайного числа в заданном диапазоне
var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
// Тасование Фишера — Йетса
var randomPermutation = function (arr) {
  var originalArray = arr.slice(0);
  var randomArray = [];
  for (var i = originalArray.length - 1; i >= 0; i--) {
    var j = getRandom(0, i);
    randomArray.push(originalArray[j]);
    originalArray.splice(j, 1);
  }
  return randomArray;
};
// Получение массива случайной длины из другого массива
var getRandomFeatures = function (arr) {
  var featuresArray = randomPermutation(arr);
  return featuresArray.slice(0, getRandom(1, featuresArray.length));
};

var getMockArray = function (arrTitle, arrType, arrFeatures, arrPhotoPath) {
  var mockArray = [];
  for (var i = 0; i < 8; i++) {
    var locationX = getRandom(300, 900);
    var locationY = getRandom(130, 630);
    var mockObj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: arrTitle[getRandom(0, arrTitle.length - 1)],
        address: locationX + ', ' + locationY,
        price: getRandom(1000, 1000000),
        type: arrType[getRandom(0, arrType.length - 1)],
        rooms: getRandom(1, 5),
        guests: getRandom(1, 50),
        checkin: getRandom(12, 14) + ':00',
        checkout: getRandom(12, 14) + ':00',
        features: getRandomFeatures(arrFeatures),
        description: '',
        photos: randomPermutation(arrPhotoPath)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    mockArray.push(mockObj);
  }
  return mockArray;
};


var mockData = getMockArray(
    OFFER_TITLE_LIST,
    OFFER_TYPE_LIST,
    OFFER_FEATURES_LIST,
    OFFER_PHOTOS_LIST
);


/* ------------------- Part 2 ------------------- */

// var mapEl = document.querySelector('.map'); //  <<<------------------------------go to activate.js
// mapEl.classList.remove('map--faded'); //  <<<------------------------------------go to activate.js


/* ------------------- Part 3 ------------------- */

var template = document.querySelector('template');

var mapPinTemplate = template.content.querySelector('.map__pin');

var createNewPin = function (title, avatar, x, y) {
  var newPin = mapPinTemplate.cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPin.style = 'left: ' + (x - 25) + 'px; top: ' + (y - 70) + 'px;';
  newPinImg.src = avatar;
  newPinImg.alt = title;
  return newPin;
};


/* ------------------- Part 4 ------------------- */

var renderPins = function (arr) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var child = createNewPin(arr[i].offer.title, arr[i].author.avatar, arr[i].location.x, arr[i].location.y);
    var data = arr[i];
    var onMapPinClick = function () {
      createCard(data);
    };
    child.addEventListener('click', onMapPinClick); //-------?
    fragment.appendChild(child);
  }
  mapPins.appendChild(fragment);
};

// renderPins(mockData); <<<------------------------------------------------------!!!!!

/* ------------------- Part 5 ------------------- */

var mapCardTemplate = template.content.querySelector('.map__card');

var translateCardType = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var createCardPhotos = function (card, arr) {
  var newPhotos = document.createDocumentFragment();
  var photo = card.querySelector('.popup__photo');
  for (var i = 0; i < arr.length; i++) {
    var clone = photo.cloneNode(true);
    clone.src = arr[i];
    newPhotos.appendChild(clone);
  }
  return newPhotos;
};

var createCard = function (obj) {
  var card = mapCardTemplate.cloneNode(true);

  var cardAvatar = card.querySelector('.popup__avatar');
  cardAvatar.src = obj.author.avatar;

  var cardTitle = card.querySelector('.popup__title');
  cardTitle.textContent = obj.offer.title;

  var cardAddress = card.querySelector('.popup__text--address');
  cardAddress.textContent = obj.offer.address;

  var cardPrice = card.querySelector('.popup__text--price');
  cardPrice.textContent = obj.offer.price + String.fromCharCode(8381) + '/ночь';

  var cardType = card.querySelector('.popup__type');
  cardType.textContent = translateCardType[obj.offer.type];

  var cardCapacity = card.querySelector('.popup__text--capacity');
  cardCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';

  var cardTime = card.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  var cardFeatures = card.querySelector('.popup__features');
  cardFeatures.textContent = obj.offer.features.join(', ');

  var cardDesc = card.querySelector('.popup__description');
  cardDesc.textContent = obj.offer.description;

  var cardPhotos = card.querySelector('.popup__photos');
  var oldPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhotos.appendChild(createCardPhotos(card, obj.offer.photos));
  cardPhotos.removeChild(oldPhoto);

  mapEl.appendChild(card);
};

// createCard(mockData[1]); <<<------------------------------------------------------!!!!!
