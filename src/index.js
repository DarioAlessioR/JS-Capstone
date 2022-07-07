/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { result } from 'lodash';
import './style.css';

const urlFood = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const urlData = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const urlDataId = 'Lg1NwTSFJSG37nTmEN8x';
const urlDataLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/likes/`;
const urlDataPostComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/comments/`
const urlDataGetComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/comments?item_id=`

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
 // captureCommentsClicks(result);
  return result;
};

const countFoods = (result) => {
  const counter1 = document.querySelector('.counter1');
  let foodCounter = 0;
  result.forEach(element => {
    foodCounter += 1;
  });
  counter1.innerHTML = `Number of items: ${foodCounter}`;
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
    <button class="platillo-comments" id="comments${v}" type="button">Comments</button>
    <button class="platillo-reservations" id="reservations" type="button">Reservations</button>
    </div>
        `;
        prueba1.appendChild(food);
      }
    }
  });
  const commentbuttons = document.querySelectorAll('.platillo-comments');
  captureCommentsClicks(commentbuttons, result);
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

const captureCommentsClicks = (commentbuttons, result) => {
  commentbuttons.forEach(element => {
    element.addEventListener('click', () => {
      let button = element.id.slice(8);
      openPopup(button, result);
      });
    })
  };
  

const openPopup = (button, result) => {

  const title = result[button-1].strCategory;
  const description = result[button-1].strCategoryDescription;
  const image = result[button-1].strCategoryThumb;
  
  const popupContent = document.createElement('div');
  popupContent.classList.add('popupwindow')
    popupContent.innerHTML = `
    
      <div class="closepopup">XXXXXXXXXXXXXXXXXXXXXX</div>

      <div class="image-container">
      <img class="platillo-img" src=${image} alt="">
      </div>

      <div class="platillo-content">
      <p class="platillo-title">${title}</p>
      <p class="platillo-title">${description}</p>
    
      <h3>Users comments</h3>
      <p class="comments"></p>
      </div>

      <h3>Add a comment</h3>

      <br>
      
      <label for="Your name">Name</label>
      <input type="text" id="username" name="user_name" placeholder="Your name" required minlength="1" maxlength="30"/>
      
      <br>

      <label for="msg">Your comment</label>
      <textarea id="msg" name="user_message" placeholder="Your comment" required minlength="1" maxlength="500"></textarea>
      
      <br>
      
      <button class="submit" type="button">Submit</button>
     
        `;

  const counter2 = document.querySelector('.counter2'); 
  const popup = document.querySelector('.popup');
  popup.appendChild(popupContent);
  const closepopup = document.querySelector('.closepopup')
  closepopup.addEventListener('click', () => {
    popup.removeChild(popupContent);
    popup.removeChild(counter2);
  })
  getDataComments(button)
};

const injetcCaptureComments = (commentsObj, id) => {
  commentsObj.forEach(element => {
    const date = element.creation_date;
    const user = element.username;
    const usercomment = element.comment;

    const comments = document.querySelector('.comments');
    comments.innerHTML += date + '----' + user + '----' + usercomment + '<br>';
  });
  const submit = document.querySelector('.submit');
    submit.addEventListener('click', () => {
      const username = document.getElementById('username')
      const usernameValue = username.value;   
      const usercomment = document.getElementById('msg')
      const userCommentValue = usercomment.value
      if (usernameValue !== null && userCommentValue !== null) {
        postDataComments(id, usernameValue, userCommentValue);
        
        const comments = document.querySelector('.comments');
        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let day = d.getDay()+3;

        comments.innerHTML += year + '-' + month + '-' + day + '----' + usernameValue + '----' + userCommentValue + '<br>';
        username.value = '';
        usercomment.value = '';

      } else {
        const error = document.querySelector('.errormessage');
        const errormessage = document.createElement('h4');
        errormessage.innerHTML = 'Please, type your name and your comment. Thank you.';
        error.appendChild(errormessage);
     }
  }) 
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


const postDataComments = async (id, user, usercomment) => {
    const comment = await fetch(urlDataPostComments, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: user,
        comment: usercomment
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    const data = await response.json();
    console.log(data)
    return data;
  };
  
   //postDataComments()
  
  const getDataComments = async (id) => {
    const results3 = await fetch(`${urlDataGetComments}${id}`);
    const commentsObj = await results3.json();
    injetcCaptureComments(commentsObj, id);
    countComments(commentsObj)
    return commentsObj;
  };
  
  const countComments = (commentsObj) => {
    const counter2 = document.querySelector('.counter2');
    let commentsCounter = 0;
    commentsObj.forEach(element => {
      commentsCounter += 1;
    });
    counter2.innerHTML = `Number of comments: ${commentsCounter}`;
  };





 // getDataComments();
  




getData();