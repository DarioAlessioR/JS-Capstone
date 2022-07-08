/* eslint-disable no-unused-vars */

const mockcountComments = (arr) => {
  let commentsCounter = 0;
  arr.forEach((element) => {
    commentsCounter += 1;
  });
  return commentsCounter;
};

export default mockcountComments;