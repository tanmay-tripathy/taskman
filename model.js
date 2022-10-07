const db = require('./firebase');

const addDocument = (colName,data) => {
  console.log('Recieved add request ... ');
  return db.collection(colName).doc().set(data);
}

const getDocument = (colName) => {
  console.log('Recieved get request ... ');
  getDocs(collection(db,colName))
  .then((response) => {
    response.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  })
  .catch((error)=>console.log(error))
}

module.exports = {addDocument , getDocument};