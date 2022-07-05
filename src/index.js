//import _ from 'lodash';
import './style.css';
import sum from './modules/prueba.js';

const getData = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const url2 = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4UvdTn5NAXeyK3iSlBaQ/likes/';
    const results = await fetch(url);
    const results2 = await fetch(url2, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const mealObj = await results.json();
    const likesObj = await results2.json();
    const result = mealObj.categories;
  
   // displayList(result, likesObj);
  
   console.log(mealObj)
  console.log(result)
  
  printfood(result);
    return result;
  };
  
  
  const printfood = (result) => {
    result.forEach(element => {
    
      const x = element.strCategory;
      // const y = element.strCategoryDescription;
      const z = element.strCategoryThumb;
      
      const img1 = document.createElement('img')
      img1.setAttribute('src', z)
    
      const food = document.createElement('li')
      food.setAttribute('class', 'food');
      food.appendChild(img1);
      
      /* const food1 = document.createElement('h3')
      food1.setAttribute('class', 'food1');
      food1.innerHTML = `${x}`; */
  
      const food2 = document.createElement('p')
      food2.setAttribute('class', 'food2');
      food2.innerHTML = `${y}`;
  
      food.appendChild(food1);
      food.appendChild(food2);
  
      const prueba1 = document.getElementById('prueba1');
      prueba1.appendChild(food);
  
    });
  }
  
  
  getData();

  /* ID   Lg1NwTSFJSG37nTmEN8x */