# ** PROYECTO DE TIENDA ONLINE PARA OPTIMA TECNOLOGIA **

#### _Autor_

Kevin Adrian Argueta López

### _No. Código_

GDA00452-OT

### _Fecha de realización del proyecto_

2024-12-xx / 2025-01-xx

## ** DOCUMENTACIÓN INTERFAZ **

Lenguajes utilizados:

- Javascript
- JSX
- CSS

Gestión de paquetes utilizados

- NPM

Paquetes utilizados

- FontAwesome Icons
- HookForm | resolvers
- React Helmet
- React hook form
- React router dom
- Styled components
- yup

El programa necesita para funcionar

- Tener instalado node.js
- Iniciar npm
- Descargar los paquetes

## El proyecto se ha modulado de la siguiente forma

- _Carpeta componentes_
  En esta carpeta está el código para los componentes que se utilizaran para el proyecto.

- _Carpeta contextos_
  En esta carpeta está el código para la validación e información de sesión del usuario.

- _Carpeta elementos_
  En esta carpeta está el código para los estilos de los componentes.

- _Carpeta esquemas_
  En esta carpeta está el código de los esquemas yup para la validación de los formularios.

- _Carpeta hooks_
  En esta carpeta está el código de algunas funciones frecuentes y algunas peticiones para consumir el API que se utilizaran para el proyecto.

- _Carpeta imagenes_
  En esta carpeta están diferentes imagenes del logo para el proyecto.

## Variedades GT

Para poder personalizar un poco más el proyecto he optado por nombrar a la tienda Variedades GT, junto con la elaboración de 3 logos algo simples para la tienda. Los colores elegidos para el logo son mayormente blanco, azul oscuro y negro.

### Colores de la tienda

Los colores predominantes son el azul oscuro y blanco, pero también hay otro colores para detalles más pequeños, como botones, etiquetas, alertas, etc.

## Utilización de styled components

He optado por la utilización de styled components para el proyecto, la justificación de esta decisión es poder personalizar más el proyecto y darle un toque singular al mismo tiempo que se crean componentes reutilizables.
Styled components no es más que CSS puro con algunas opciones para volver más dinámico el código de css y evitar repetir código.

## Utilización de YUP

He optado por la utilización de esquemas yup para las validaciones de formularios, para poder hacer las validaciones más dinámicas y precisas al mismo tiempo que se mantiene un código más limpio, legible y modulado.

## Utilización de Hook Form

He optado para el manejo de los formularios, ya que react cuenta con una forma algo rígida de trabajar con formularios, al usar Hook Form volvemos más dinámico y optimizado el código para los formularios.

## Utilización de FontAwesomeIcons

He optado por FontAwesome para poder personalizar más la interfaz y darle un toque más amigable y bonito a la vista.

## React Helmet

He decidido agregar esta libreria para poder interactuar con algunos headers del código html.

## React Router

He preferido utilizar react router para establecer las rutas e interactuar con los links.

## Página Responsive

La aplicación es completamente responsive, para poder verlo desde celulares, tablets, computadoras, laptops e incluso televisores.

## Rutas Seguras

Mediante la utilización de useContext se ha creado un sistema para evitar que usuarios sin iniciar sesión no puedan acceder a ninguna parte del resto de la aplicación.

### Funciones para clientes

- Iniciar sesión como cliente
- Ver los productos disponibles
- Agregar al carrito x cantidad de los productos que desee
- Ver su carrito de compras actual y carritos de compras pasadas
- Buscar productos por nombre o categorías
- Guardar productos en la sección de ver más tarde
- Ver la información de su perfil y cambiar algunos datos
- Hacer la solicitud de compra de su carrito con los datos de compra
- Ver el historial de compras, estados de sus compras, rechazar compras que aún no han sido entregadas y editar algunos datos de compra
- Cerrar sesión

### Funciones para operadores

- Iniciar sesión como operador
- Ver todas las ordenes de compra existentes, según sus estados: "Solicitud de orden", "Orden cancelada", "Orden rechazada", "Orden entregada"
- Entregar Ordenes
- Rechazar ordenes
- Agregar nuevos clientes
- Agregar nuevos usuarios
- Agregar nuevas categorías
- Agregar nuevos Productos
- Ver y editar algunos datos de su perfil
- Actualizar datos de clientes
- Actualizar datos de usuarios
- Actualizar datos de categorías
- Actualizar datos de Productos
- Activar/Desactivar Usuarios, Categorias y Productos
- Cerrar sesión

### P.D.

Cada que cierren sesión con cualquier usuario, recomendaría hacer F5 en la página de login, para evitar confusión con las cookies
