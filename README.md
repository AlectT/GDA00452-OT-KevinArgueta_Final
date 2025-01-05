# ** PROYECTO DE TIENDA ONLINE PARA OPTIMA TECNOLOGIA **

#### _Autor_

Kevin Adrian Argueta López

### _No. Código_

GDA00452-OT

### _Fecha de realización del proyecto_

2024-12-xx

## ** DOCUMENTACIÓN GENERAL DEL PROYECTO **

El proyecto está dividido en 3 partes

- 1. El archivo para la creación de las tablas para la base de datos, sus relaciones, procedimientos almacenados y las vistas, más algunos registros de prueba
- 2. La carpeta del API que contiene toda la lógica del backend para el proyecto, solicitudes GET, POST, PUT, PATCH Y DELETE; también la lógica para la validación de JSON web token e inicio de sesión;
- 3. La carpeta tienda-online la cual contiene todo el código para la interfaz de la aplicación desde la cual se consumira el API. La interfaz se divide en interfaz para clientes y operadores, la que se definirá desde el JSON web token al momento de iniciar sesión

Tecnologías utilizadas generales

- 1. Microsoft SQL Server Management Studio
- 2. NodeJS
- 3. ReactJS

## Registros de prueba en el script sql

He dejado preparado algunos registros en el script de la base de datos para que se les faciliten las pruebas que gusten hacer. Si desean agregar nuevos usuarios les recomendaría hacerlo desde la aplicación con react, para poder encriptar la contraseña a través del API. Dejé 3 usuarios registrados con los cuales ya podrían ingresar a traves del login. Los datos para el login son:

_Usuario Operador_
correo: adminGeneral@gmail.com
contraseña: 12345

_Primer Cliente_
correo: primerCliente@gmail.com
contraseña: 12345

_Segundo Cliente_
correo: segundoCliente@gmail.com
contraseña: 12345

_Registros Clientes_
Dejé algunos registros de clientes de prueba por si desean agregar nuevos usuarios con rol cliente puedan usar esos y no tener que necesariamente registrar nuevos clientes también

_Registros Categorias_
Dejé solo una categoría para que puedan probar agregar nuevos productos a esa categoría pero también agregar nuevas categorías para otros productos

_Registros Productos_
Solo dejé 2 registros para que puedan ver su funcionalidad básica, pero estos no cuentan con fotos ya que guardar una foto desde sql ocupa muchas lineas, ya que son archivos binarios, lo mejor sería que agreguen nuevos productos desde la aplicación con sus respectivas fotos o bien actualizar esos 2 registros de productos para agregarles su foto
P.D. La foto tiene que tener un peso máximo de 50KB

_Registros Roles_
Ya dejé preparados los roles dentro del script, siendo solo rol cliente y rol operador

_Registros Estados_
Los estados también ya los dejé preparados, para productos, categorías, usuarios y ordenes

_Registros Ordenes y Detalles_
Estos he decidido no dejar ninguno preparado para que puedan crear ustedes sus propios carritos con los usuarios de clientes

### P.D.

Una disculpa de antemano por haber cambiado de repositorio, pensé que se subirían en repositorios diferentes el API de la interfaz. En este repositorio está completo el proyecto. DB + API + REACT
