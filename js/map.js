'use strict';

//Генератор случайного числа в заданном диапазоне
var getRandom = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

//Тасование Фишера — Йетса
var randomPermutation = function(arr) {
  var randomArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    var j = getRandom(0, i);
    randomArray.push(arr[j]);
    arr.splice(j, 1);
  }
  return randomArray;
};

//Получение массива случайной длины из другого массива
var getRandomFeatures = function(arr) {
  return arr.splice(getRandom(0, arr.length - 1), getRandom(1, arr.length));
};

var OFFER_TITLE_LIST = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
var OFFER_TYPE_LIST = ["palace", "flat", "house", "bungalo"];
var OFFER_FEATURES_LIST = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];
var OFFER_PHOTOS_LIST = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

/*-------------------*/

var createRandomAdvert = function(
  arrTitle,
  arrType,
  arrFeatures,
  arrPhotoPath
) {
  var randomAdvert = {};
  var locationX = getRandom(300, 900);
  var locationY = getRandom(130, 630);

  randomAdvert.author = {};
  randomAdvert.author.avatar =
    "img/avatars/user0" + getRandom(1, 8) + ".png";

  randomAdvert.offer = {};
  randomAdvert.offer.title = arrTitle[getRandom(0, 7)];
  randomAdvert.offer.address = locationX + ", " + locationY;
  randomAdvert.offer.price = getRandom(1000, 1000000);
  randomAdvert.offer.type = arrType[getRandom(0, 3)];
  randomAdvert.offer.rooms = getRandom(1, 5);
  randomAdvert.offer.guests = getRandom(1, 50);
  randomAdvert.offer.checkin = "1" + getRandom(2, 4) + ":00";
  randomAdvert.offer.checkout = "1" + getRandom(2, 4) + ":00";
  randomAdvert.offer.features = getRandomFeatures(arrFeatures);
  randomAdvert.offer.description = "";
  randomAdvert.offer.photos = randomPermutation(arrPhotoPath);

  randomAdvert.location = {};
  randomAdvert.location.x = locationX;
  randomAdvert.location.y = locationY;

  return randomAdvert;
};


var arrayOfObjects = [];

for (var i = 0; i < 5; i++) {
  var newObj = createRandomAdvert(
      OFFER_TITLE_LIST,
      OFFER_TYPE_LIST,
      OFFER_FEATURES_LIST,
      OFFER_PHOTOS_LIST
    );
  arrayOfObjects.push(newObj);
}

console.log(arrayOfObjects);
