import * as axios from 'axios';
import { countries } from './ordertour';

const currentQ = {
  query: '',
  i: 0,
  getQuery: function () {
    return new URLSearchParams({
      key: '28235798-10089aa8a519f6d1c62a23eff',
      q: `${countries[this.i].name} photo`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
  },
};

async function toQuery() {
  const now = currentQ.getQuery().toString();
  const query = await axios({
    method: 'get',
    url: `https://pixabay.com/api/?${now}`,
  });
  return query;
}

export function changeID(id) {
  currentQ.i = id - 1;
}

export const fetchImg = async () => {
  try {
    const query = await toQuery();
    return query;
  } catch (error) {
    console.log(error.message);
  }
};
