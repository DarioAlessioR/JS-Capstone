/* eslint-disable import/no-cycle */

import { postLike } from '../index.js';

const captureLike = (hearts) => {
  hearts.forEach((element) => {
    element.addEventListener('click', () => {
      postLike(element.id);
    });
  });
};

export default captureLike;