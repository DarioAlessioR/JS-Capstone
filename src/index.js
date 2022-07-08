/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import './style.css';
import getData from './modules/getdata.js';
import countFoods from './modules/countfoods.js';
import captureLike from './modules/capturelike.js';

const urlDataId = 'Lg1NwTSFJSG37nTmEN8x';
const urlDataLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/likes/`;
const urlDataPostComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/comments/`;
const urlDataGetComments = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${urlDataId}/comments?item_id=`;

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

const captureCommentsClicks = (commentbuttons, result) => {
  commentbuttons.forEach(element => {
    element.addEventListener('click', () => {
      const button = element.id.slice(8);
      openPopup(button, result);
      const popup = document.querySelector('.popup');
      popup.style.display = ('block');
    });
  });
};

const openPopup = (button, result) => {
  const title = result[button - 1].strCategory;
  const description = result[button - 1].strCategoryDescription;
  const image = result[button - 1].strCategoryThumb;

  const popupContent = document.createElement('div');
  popupContent.classList.add('popupwindow');
  popupContent.innerHTML = `
    
  <p class="closepopup">X</div>

  <div class="image-container2">
      <img class="platillo-img2" src=${image} alt="">
  </div>
  
  <div class="platillo-content2">
      <p class="platillo-title2">${title}</p>
      <p class="platillo-description2">${description}</p>
  </div>
  
  <div class="comments-container">
  <div class="counter2"></div>
      <h3 class="user-comments">Users comments</h3>
  </div>

  <p class="comments"></p>
  
  <h3 class="add-comment">Add a comment</h3>
  
  <form>
    <input type="text" id="username" name="user_name" placeholder="Your name" required minlength="1" maxlength="30" />
    <textarea id="msg" name="user_message" placeholder="Your comment" required minlength="1" maxlength="500"></textarea>
    <button class="submit" type="button">Submit</button>
</form>
  <div class="errormessage"></div>
        `;

  const counter2 = document.querySelector('.counter2');
  const popup = document.querySelector('.popup');
  popup.appendChild(popupContent);
  const closepopup = document.querySelector('.closepopup');
  closepopup.addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    popup.style.display = ('none');
    popup.removeChild(popupContent);
    popup.removeChild(counter2);
  });
  getDataComments(button);
};

const injetcCaptureComments = (commentsObj, id) => {
  commentsObj.forEach(element => {
    const date = element.creation_date;
    const user = element.username;
    const usercomment = element.comment;

    const comments = document.querySelector('.comments');
    comments.innerHTML += `${date}----${user}----${usercomment}<br>`;
  });
  const submit = document.querySelector('.submit');
  submit.addEventListener('click', () => {
    const username = document.getElementById('username');
    const usernameValue = username.value;
    const usercomment = document.getElementById('msg');
    const userCommentValue = usercomment.value;
    if (usernameValue !== null && userCommentValue !== null) {
      postDataComments(id, usernameValue, userCommentValue);

      const comments = document.querySelector('.comments');
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDay() + 3;

      comments.innerHTML += `${year}-${month}-${day}----${usernameValue}----${userCommentValue}<br>`;
      username.value = '';
      usercomment.value = '';
    } else {
      const error = document.querySelector('.errormessage');
      const errormessage = document.createElement('h4');
      errormessage.innerHTML = 'Please, type your name and your comment. Thank you.';
      error.appendChild(errormessage);
    }
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

const postDataComments = async (id, user, usercomment) => {
  const comment = await fetch(urlDataPostComments, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: user,
      comment: usercomment,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const data = await response.json();
  return data;
};

const getDataComments = async (id) => {
  const results3 = await fetch(`${urlDataGetComments}${id}`);
  const commentsObj = await results3.json();
  injetcCaptureComments(commentsObj, id);
  countComments(commentsObj);
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

getData();

export {
  printfood, countFoods, captureCommentsClicks, captureLike, postLike,
};
