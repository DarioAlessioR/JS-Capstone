import './style.css';

const urlFood = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const urlData = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const urlDataId = 'Lg1NwTSFJSG37nTmEN8x';
const urlDataLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/likes/`;
const urlDataComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/comments/`;

const url2 = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4UvdTn5NAXeyK3iSlBaQ/likes/';

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
  return result;
};

const printfood = (result, likesObj) => {
  const prueba1 = document.getElementById('prueba1');
  prueba1.innerHTML = '';
  result.forEach((element) => {
    const v = element.idCategory;
    const x = element.strCategory;
    const z = element.strCategoryThumb;
    for (let i = 0; i < likesObj.length; i += 1) {
      let w = '';
      if (likesObj[i].item_id === v) {
        w = likesObj[i].likes;

        const food = document.createElement('li');
        food.innerHTML = `
    <div class="image-container">
    <img class="platillo-img" src=${z} alt="">
    </div>
    <div class="platillo-content">
    <p class="platillo-title">${x}</p>

    <p class="platillo-likes"><span class="likes">${w}</span>

        <span class="heart" id=${v}>&#10084</span> likes
    </p>
    </div>
    <div class="platillo-buttons">
    <button class="platillo-comments" id="comments" type="button">Comments</button>
    <button class="platillo-reservations" id="reservations" type="button">Reservations</button>
    </div>
        `;
        prueba1.appendChild(food);
      }
    }
  });
  const hearts = document.querySelectorAll('.heart');
  captureLike(hearts);
};

const captureLike = (hearts) => {
  hearts.forEach((element) => {
    element.addEventListener('click', () => {
      postLike(element.id);
    });
  });
};

const postLike = async (id) => {
  const response = await fetch(urlDataLikes, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const data = await response.text();
  getData();
  return data;
};

getData();

/*
const newApp = async () => {
  const response = await fetch(
    urlData,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  const id = await response.text();
  console.log(id);
  return id;
};

newApp();
*/
