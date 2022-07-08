/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { countFoods, printfood } from '../index.js';

const urlFood = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const urlData = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const urlDataId = 'Lg1NwTSFJSG37nTmEN8x';
const urlDataLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/likes/`;

const getData = async () => {
  const results = await fetch(urlFood);
  const results2 = await fetch(urlDataLikes, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const mealObj = await results.json();
  const result = mealObj.categories;
  const likesObj = await results2.json();
  printfood(result, likesObj);
  countFoods(result);
  return result;
};

export default getData;
