/* eslint-disable no-unused-vars */

const mockcountFoods = (arr) => {
  let foodCounter = 0;
  arr.forEach((element) => {
    foodCounter += 1;
  });
  return foodCounter;
};

export default mockcountFoods;