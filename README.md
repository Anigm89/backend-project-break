# Tienda de ropa

En este proyecto de back-End he creado una tienda de ropa con un catálogo de productos y un dashboard para el administrador. Los productos se guardan en una base de datos de mongo en Atlas. Sólo el administrador de la web podrá crear, editar o eliminar productos, para ello primero deberá registrase y luego iniciar sesión.

## Estructura de archivos del proyecto

.
├── src
│   ├── config
│   │   ├── db.js 
│   │   └── firebase.js
│   ├── controllers
│   │   ├── productController.js  
│   │   └── authController.js --> 
|   |   |__ docProductController.js 
|   |__ docs
|   |   |__ basicInfo.js
|   |   |__ components.js
|   |   |__ index.js
|   |   |__ products.js
|   |__ middleware
|   |   |__ authMiddleware.js
│   ├── models
│   │   └── Product.js
│   ├── routes
│   │   └── productRoutes.js
│   │   └── docRoutes.js
│   ├── test
│   │   └── productController.test.js
│   ├── utils
│   │   └── htmlUtils.js
│   └── index.js
├── public
│   ├── styles.css
│   └── images 
├── .env
└── package.json
└── .gitignore


### Características de los archivos

- `config/db.js`: Archivo que contiene la configuración y conexión con la base de datos de mongo en Atlas.
- `config/firebase.js`: Contiene la configuración y conexión con Firebase 
- `controllers/productController.js`: Archivo que contiene la lógica para manejar las solicitudes CRUD de los productos. Devuelve las respuestas en formato HTML.
- `controllers/docProductController.js`: Archivo creado para la documentación con swagger, que contiene la lógica para manejar las solicitudes CRUD de los productos pero devuelve las respuestas en formato JSON.
- `controllers/authController.js`: Archivo que maneja las solicitudes de autenticación, contiene las funciones para crear un nuevo usuario o verificar el inicio de sesión del usuario ya registrado.
- `docs/`: Contine los archivos necesarios para la documentación con Swagger.
- `middlewares/authMiddleware.js`: Archivo que contine el middleware para comprobar si el usuario está autenticado. Si el usuario no ha iniciado sesión, le redirige a la home., pero si hay sesión activa puede continuar y entrar en las rutas del admin(/dashboard)
- `models/Product.js`: Archivo que contiene la definición del esquema del producto utilizando Mongoose.
- `routes/productRoutes.js`: Archivo que contiene todas las rutas de la aplicación. Este archivo llama a los métodos del controlador y al middleware(si es necesario).
- `routes/docRoutes.js`: Archivo que contine las rutas de la API creada para la documentación con Swagger. Estas rutas no contienen el middleware, solo comprueba que funciona el CRUD sin verificar si hay inicio de sesión.
- `test/productController.test.js`: Archivo que contiene los test creados con Jest y supertest para las funciones del CRUD
- `utils/htmlUtils.js`: Archivo que contiene la respuesta de las funciones del productController. En este archivo se crean las funciones que muestran el html que devuelven las funciones del productController.js
- `index.js`: Archivo principal que inicia el servidor Express. Importa las rutas y las usa. También tiene está configurado para servir archivos estáticos con express.static  y para leer el body de las peticiones de formularios con express.urlencoded
- `public/styles.css`: Archivo CSS que contiene los estilos de la aplicación.
- `public/images`: Carpeta que tiene las imágenes de los productos.
- `.env`: Archivo que contiene las variables de entorno. En este caso, la uri de la base de datos de Atlas, el puerto de la aplicación, la palabra secreta para la sesión y la api_key para la conexión con firebase
- `package.json`: Archivo que contiene las dependencias del proyecto. Crea un script para iniciar el servidor con node start ("start": "node src/index.js") y para los test con jest ( "test:watch": "jest --watchAll").


# Creación del proyecto

Este proyecto funciona con una base de datos de Mongo Atlas.
El modelo de producto tiene los siguientes campos: Nombre, Descripción, Imagen, Categoría, Talla y Precio
La categoría y la talla son un string, el precio es tipo decimal y el nombre y el precio son  campos obligatorios.

El index contiene el servidor creado con express. El puerto en el que escuchará el servidor lo cargo desde el archivo .env usando `dotenv`.

Para poder añadir estilos, imágenes, etc. uso el middleware `express.static` para servir archivos estáticos. 


## Creación de rutas

- router.get('/', ProductController.ShowHome);  --> contine la home
- router.get('/products', ProductController.ShowProducts);  --> Devuelve todos los productos. La imagen del producto tiene un enlace a su página de detalle.
- router.get('/products/:_id', ProductController.showProductById); --> Devuelve el detalle de un producto por su id.
- router.get('/products/category/:categoria', ProductController.showProdutsCategory) --> Devuelve todos los productos según su categoría.

#### a estas rutas solo se puede acceder después de iniciar sesión

- router.get('/dashboard', ProductController.showLogin); --> si no estás logado, muestra el formulario de inicio de sesión pero si ya has iniciado sesión muestra todos los productos al admin
- router.post('/login', ProductController.iniciosession); --> recoge y verifica los datos del formulario de login y crea un nuevo usuario o inicia sesión
- router.post('/logout', ProductController.logOut); --> cierra sesión y te redirige a la home
- router.get('/dashboard/new', verificarSesion, ProductController.showNewProduct); --> muestra el formulario para crear un producto nuevo
router.post('/dashboard', verificarSesion, ProductController.createProduct); --> recoge los datos del formulario y crea el producto nuevo. Después te lo muestra por su Id
- router.get('/dashboard/products/category/:categoria',verificarSesion, ProductController.showProdutsCategory) --> muestra todos los productos al admin según su categoría
- router.get('/dashboard/products/:_id', verificarSesion, ProductController.showProductById);  --> Devuelve el detalle de un producto por su id, al estar en /dasboard muestra botones al admin para editar o eliminar el producto
- router.get('/dashboard/products/:_id/edit',verificarSesion, ProductController.showEditProduct); --> Devuelve el formulario para editar un producto.
- router.post('/dashboard/products/:_id', verificarSesion, ProductController.updateProduct) --> recoge los datos del formulario y actualiza un producto. Después lo muestra
- router.post('/dashboard/products/:_id/delete', verificarSesion, ProductController.deleteProduct) --> Elimina un producto.


## Creación de controladores

El archivo productController.js se dedica a manejar las solicitudes CRUD de los productos. Devolvuelve una funciones auxiliares que muestran las respuestas en formato HTML.

Las funciones principales del controlador son:

- showProducts: Devuelve la vista con todos los productos.
- showProductById: Devuelve la vista con el detalle de un producto. Si se llega desde el dashboard, muestra un enlace para editar o eliminar el producto.
- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- showEditProduct: Devuelve la vista con el formulario para editar un producto.
- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.



Para mostrar las respuestas en html he creado unas funciones auxiliares que están en utils/htmlUtils.js
Por ejemplo:
- baseHtml: html común a todas las páginas.
- getNavBar: Genera el menú de navegación con las categorías. En caso de estar en el dashboard, tiene un enlace para crear un nuevo producto o cerrar sesión.
- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
- footer: genera el html del footer común en todas las rutas de la web.
- ...


## Despliegue

Al terminar el proyecto lo subo a github y lo despliego en fl0.


##  Tests

Para poder comprobar que el controlador de productos funciona correctamente, he creado tests para las funciones principales del CRUD. Para ello, he instalado el paquete `jest` , `supertest` y `supertest-session`  y he creado el archivo `productController.test.js` en la carpeta `test`.


##  Autenticación con Firebase

Para que solo un usuario registrado pueda iniciar sesión y acceder a las rutas `/dashboard` he creado un login con email y contraseña con firebase. Para ello, he  instalado los paquetes `firebase`, `firebase-admin`, `axios` y `express-session` y configurar el proyecto en firebase auth. 

el formulario del login aparece en /dashboard si no hay sessión activa, una vez completado, te redirige a /login donde verifica si es un nuevo registro o un inicio de sesión y esto lo verifica en el archivo authController.js
Si es un nuevo registro, tras crear el nuevo usuario aparecerá un mensaje que te redirige al login para iniciar sesión.
Si ya estás registrado, verifica que email y contraseña son correctas y te redirige de nuevo a dashboard, en este caso, tras iniciar sesión el /dasboard uestra todos los productos. En caso de que el email o contrseña sea incorrectas, muestra un mensaje y te redirige a  la home.

El archivo `middlewares/authMiddleware.js` contiene el middleware para comprobar si la sesión está activa, si no lo está, redirigirá a la home.

##  API y documentación con Swagger

Para poder documentar con Swagger he creado los archivos docroutes,js y docProductController que continen las rutas y las funciones CRUD de la API y devuelve datos en formato JSON.
Para ver los resultados en formato JSON hay que poner `/api`, por ejemplo para ver todos los productos, la ruta sería /api/products

## Recursos utilizados

En este proyecto de backEnd he utilizado:
  -  "axios": para verificar email y pass en firebase
  -  "dotenv": para las variables de entorno
  -  "express": para crear el servidor,
  -  "express-session": para crear sesiones,
  -  "firebase": para la autenticación,
  -  "firebase-admin": para la autenticación,
  -  "jest": para los test,
  -  "mongoose": para la base de datos con Mongo Atlas,
  -  "supertest": para los test,
  -  "supertest-session": para los test con inicio de sesión,
  -  "swagger-ui-express": para documentar la API

