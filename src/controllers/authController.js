const firebaseAdmin = require('../config/firebase');
require("dotenv").config();
const axios = require('axios');


async function createUser(req, email, password) {
  console.log('Creando el usuario con email ' + email);

  try {
      const userRecord = await firebaseAdmin.auth().createUser({
          email: email,
          password: password
      });
      console.log('Usuario creado exitosamente:', userRecord.uid);
      return 'Usuario creado exitosamente';
  } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      throw error;
  }
}


async function verifyPassword(email, password) {
  try {
    
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );

    return true;
  } catch (error) {
    console.error('Error al verificar la contraseña:', error.message);
    return false;
  }
}

async function loginUser(req, email, password) {
  console.log('Iniciando sesión del usuario ' + JSON.stringify(email));
  try {
   
    const isPasswordValid = await verifyPassword(email, password);

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }
      const user = await firebaseAdmin.auth().getUserByEmail(email);
      const customToken = await firebaseAdmin.auth().createCustomToken(user.uid);

      req.session.user = user;      

      return {
          uid: user.uid,
          email: user.email,
          token: customToken
      };
  } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
  }
}


module.exports={
  createUser,
  loginUser
}


