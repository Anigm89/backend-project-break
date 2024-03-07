const firebaseAdmin  = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
  //databaseURL: "https://tienda-ropa-4d8ee-default-rtdb.europe-west1.firebasedatabase.app/"

});

module.exports = firebaseAdmin;



