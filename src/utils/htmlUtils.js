const express = require('express');
const session = require('express-session');

function baseHtml(){
    const base = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Poppins:ital,wght@0,400;0,600;1,400;1,600&family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet">
        <title>Tienda</title>
    </head>
    <body>
        
    </body>
    </html>
    `;
    return base;
}

function getNavBar(req){
  let menuadmin = '';
  let admin = '<li><a href="/dashboard">Admin</a></li>'
  let link ='/products/category';
  let home = '/';
  let saludo = '';

  if(req.session.user){
     menuadmin = `
      <li><a href="/dashboard/new">Añadir Producto</a></li>
      <form action ="/logout" method = "post">
         <button type="submit">Cerrar sesión</button>
      </form>`;
      admin = '';
      home = '/dashboard';
      link = '/dashboard/products/category';
      saludo = `<h2 class="saludo">Bienvenido Admin ${req.session.user.email} </h2>`;
  }
    const navBar = `
    <nav>
        <ul class="menu">
            <li><a href="${home}">Home</a></li>
            <li><a href="${link}/camisetas">Camisetas</a></li>
            <li><a href="${link}/sudaderas">Sudaderas</a></li>
            <li><a href="${link}/camisetasKids">CamisetasKids</a></li>
            <li><a href="${link}/pijamas">Pijamas</a></li>
            ${menuadmin}
            ${admin}
        </ul>
    </nav>
    
    <div class="bienve"> ${saludo} </div>
    `;
  return navBar;
}

function home(){
  const html = `
  <section>
    <div class="home">
      <div class="hometitulo">
        <h2>¿No sabes qué ponerte?</h2>
        <a href="./products">Ver todos los productos</a>
      </div>
    </div>
  </section>  
  `
  return html;
}

function getProductCards(products, sessionActive,nextPageUrl, previousPageUrl) {
  let html = '<div class="container">';
  
  for (let product of products) {
    let link = '';
    if(sessionActive === true){
      link = `/dashboard/products/${product._id}`;
    }
    else{
      link = `/products/${product._id}`;
    }
    html += `
      <div class="product-card">
          <a href="${link}">
            <img src="images/${product.imagen} " alt="${product.nombre}">
          </a>
          <h2>${product.nombre}</h2>
          <p class = 'precio'>${product.precio}€</p>
      </div>
    `;
  }
  html += '<div class="botones">';

  if (previousPageUrl && nextPageUrl) {
    html += ` 
    <a href="${previousPageUrl}" class="previous"> < anterior</a>
    <a href="${nextPageUrl}" class="next">siguiente > </a>`;
  } else if (nextPageUrl) {
    html += `<a href="${nextPageUrl}" class="next siguiente">siguiente > </a>`;
  } else if (previousPageUrl) {
    html += `<a href="${previousPageUrl}" class="previous"> < anterior</a>`;
  }

  html += '</div>';

  html += '</div> ';
  return  html;
}

function getProductCardsById(product, sessionActive){
    let html = '';
    let addCar = '';
    let edit = '';
    let borrar = '';
    let link = '/';
    let select = `
    <select id="tallas-select">
      <option value="XS">XS</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
    `
    if(sessionActive === true){
     
      edit = `<a href="/dashboard/products/${product._id}/edit" class="editar" >Editar producto</a>`;
      borrar = `
      <form action="/dashboard/products/${product._id}/delete" method="POST">
        <button type="submit" class="borrar">Eliminar producto</button>
      </form>`;
      link='/dashboard'
      select = `
      <select name="tallas" id="tallas-select">
      <option value="XS" ${product.talla === "XS" ? 'selected' : ''}>XS</option>
      <option value="S" ${product.talla === "S" ? 'selected' : ''}>S</option>
      <option value="M" ${product.talla === "M" ? 'selected' : ''}>M</option>
      <option value="L" ${product.talla === "L" ? 'selected' : ''}>L</option>
      <option value="XL" ${product.talla === "XL" ? 'selected' : ''}>XL</option>
      </select>
      `
    }
    else{
      
      addCar = '<button class="getTalla">Añadir a la cesta</button>';
    }
      html = `
        <div class="product-cardId">
          <img src="/images/${product.imagen}" alt="${product.nombre}">
          <div class=" detalles">
            <h2>${product.nombre}</h2>
            <p class="descripcion">${product.descripcion}</p>
            <p class = 'precio'>${product.precio}€</p>
            <div class="Seltallas">
                <label for ="tallas"> Selecciona una talla: </label>
                ${select}
            </div>
              ${addCar}
              ${edit}
              ${borrar}
            <a href="${link}"> < Atrás</a>
          </div>
        </div>
      `;
    return html; 
}
function getProductCardsCategories(productsCat, sessionActive){
  let html = '<div class="container">';
  
  for (let product of productsCat) {
    let link = '';
    if(sessionActive === true){
      link = `/dashboard/products/${product._id}`
    }
    else{
      link = `/products/${product._id}`;
    }
    html += `
      <div class="product-card">
         
          <a href="${link}">
            <img src="/images/${product.imagen}" alt="${product.nombre}">
          </a>
          <h2>${product.nombre}</h2>
          <p class = 'precio'>${product.precio}€</p>
      </div>
    `;
   

  }
   html += '</div>';
  return html;
}
function formLogin(req){
  if(!req.session.user){
    const loginForm = `
    <div class="container">
      <div id="loginForm" class="Divlogin">
        <p>Por favor inicia sesión para acceder al dashboard </p>
      
        <form  action="/login" method="post" id="loginForm" class="login">
            
            <label for="email">Email :</label>
            <input type="email" name="email" placeholder="Correo Electronico" required>
            <label for="password">Contraseña :</label>
            <input type="password" id="password" name="password" required>
            <div class ="options">
              <input type="radio" name="isLoginOrSignup" id="radioIsLogin"  value="isLogin" checked/>
              <label for="radioIsLogin">Entrar a mi cuenta</label>
            </div>
            <div class ="options">
              <input type="radio" name="isLoginOrSignup" id="radioIsSignup" value="isSignup" />
              <label for="radioIsSignup">Crear cuenta</label>
            </div>
            <button  type="submit" id="btnLogin">Acceder</button>
        </form>
      </div>
    </div>
    `;
    return loginForm;
  }
  else{
    const dash = `  
    <h3 class="dash"> Mis productos </h3>
    `;
    return dash;
  }

}

function formAddProduct(){
  const formNewP=`
  <div class="containerForm">
    <h2 class="titulo">Crear producto nuevo:</h2>
    <form action="/dashboard" method="post"  class="formulario">
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" required> 
      <label for="descripcion">Descripción:</label>
      <textarea name="descripcion" id="descripcion" cols="30" rows="3"></textarea> 
      <label for="precio">Precio:</label>
      <input type="number" step="0.01" name="precio" required> 
      <label for="categoria">Categoría:</label>
      <select name="categoria" id="categoria">
        <option value="camisetas">Camisetas</option>
        <option value="sudaderas">Sudaderas</option>
        <option value="camisetasKids">Camisetas Kids</option>
        <option value="pijamas">Pijamas</option>
      </select>
      <label for="imagen">Imagen:</label>
      <input type="text" name="imagen" > 
      <label for="talla">Talla:</label>
      <select name="talla" id="talla">
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <button id="crear" type="submit">Añadir</button>
    </form>
    <a href="/dashboard"> < Atrás</a>
  </div>
  `;
  return formNewP;
}

function formEdit(product){
  const html = `
  <div class="containerForm">
    <h2 class="titulo">Editar producto:</h2>
    <form action="/dashboard/products/${product._id}" method="post" class="formulario">
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" value="${product.nombre} " required> 
      <label for="descripcion">Descripción:</label>
      <textarea name="descripcion" id="descripcion" cols="30" rows="3" value="${product.descripcion}">${product.descripcion}</textarea> 
      <label for="precio">Precio:</label>
      <input type="number" step="0.01" name="precio" value="${product.precio}" required> 
      <label for="categoria">Categoría:</label>
      <select name="categoria" id="categoria">
      <option value="camisetas" ${product.categoria === "camisetas" ? 'selected' : ''}>Camisetas</option>
      <option value="sudaderas" ${product.categoria === "sudaderas" ? 'selected' : ''}>Sudaderas</option>
      <option value="camisetasKids" ${product.categoria === "camisetasKids" ? 'selected' : ''}>Camisetas Kids</option>
      <option value="pijamas" ${product.categoria === "pijamas" ? 'selected' : ''}>Pijamas</option>
      </select>
      <label for="imagen">Imagen:</label>
      <input type="text" name="imagen" value="${product.imagen}" > 
      <label for="talla">Talla:</label>
      <select name="talla" id="talla">
      <option value="XS" ${product.talla === "XS" ? 'selected' : ''}>XS</option>
      <option value="S" ${product.talla === "S" ? 'selected' : ''}>S</option>
      <option value="M" ${product.talla === "M" ? 'selected' : ''}>M</option>
      <option value="L" ${product.talla === "L" ? 'selected' : ''}>L</option>
      <option value="XL" ${product.talla === "XL" ? 'selected' : ''}>XL</option>
      </select>
      <button id="guardar" type="submit">Guardar</button>
    </form>
    <a href="/dashboard"> < Atrás</a>
  </div>
  `;
  return html;
}
function newUsu(){
  const html = `
  <div class="container">
    <div class="newUser">
      <p>Usuario creado con éxito</p>
      <p>Ya puedes <a href="/dashboard">iniciar sesión</a> en el dashboard</p>
    </div>
  </div>
  `;
  return html;
}
function smserror(){
  const html = '<div class="container"><div class="error"><p>ERROR! el email o la contraseña no son válidos</p>  <a href="/"> < Volver</a> </div></div>';
  return html;
}
function footer(){
  const html = `
    <footer>
      <p>Proyecto de back-end diseñado y desarrollado por Ani González Moreno 
        <a href="https://github.com/Anigm89/backend-project-break">
          <img src="/images/github.png" alt="icono gitHub">
        </a>
      </p>
    </footer>
  `
  return html
}


  module.exports = {baseHtml, getNavBar,home, getProductCards, getProductCardsById, getProductCardsCategories, formLogin, formAddProduct, formEdit, newUsu, smserror, footer}