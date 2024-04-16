const dbUrl = 'https://localhost:7166';

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${uid}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error.message)); // Pass error message instead of the entire error object
});

export default getUserByUid;
