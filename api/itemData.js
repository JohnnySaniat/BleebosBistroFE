/* eslint-disable prefer-promise-reject-errors */
const dbUrl = 'https://localhost:7166';

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const searchItems = (searchValue) => fetch(`${dbUrl}/items/search-items?searchValue=${searchValue}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      console.error('Network response was not ok');
      return [];
    }
    if (response.status === 204) {
      return [];
    }
    return response.json();
  })
  .then((data) => data)
  .catch((error) => {
    console.error('Error searching items:', error);
    throw error;
  });

export {
  getAllItems,
  searchItems,
};
