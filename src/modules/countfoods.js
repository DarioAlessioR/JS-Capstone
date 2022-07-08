/* eslint-disable no-unused-vars */

const countFoods = (result) => {
  const counter1 = document.querySelector('.counter1');
  let foodCounter = 0;
  result.forEach((element) => {
    foodCounter += 1;
  });
  counter1.innerHTML = `Number of items: ${foodCounter}`;
};

export default countFoods;