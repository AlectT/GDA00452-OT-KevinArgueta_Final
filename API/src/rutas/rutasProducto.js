import { Router } from 'express';
import { agregarProducto, actualizarProducto } from '../controladores/controladorProducto.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';
import cambiarEstado from '../hooks/cambiarEstado.js';

const routerProducto = Router();

// Rutas de operador
routerProducto.post('/agregarProducto', (req, res) => {
	if (req.rol === 'O') {
		agregarProducto(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerProducto.put('/actualizarProducto/:id', (req, res) => {
	if (req.rol === 'O') {
		actualizarProducto(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerProducto.patch('/cambiarEstadoProducto/:id', (req, res) => {
	if (req.rol === 'O') {
		cambiarEstado(req, res, 'Producto');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

// Rutas de clientes y operadores
routerProducto.get('/obtenerProductos', (req, res) => {
	if (req.rol) {
		obtenerData(res, res, 'Productos');
	}
});

routerProducto.get('/obtenerProductoID/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pProductoID');
	}
});

routerProducto.get('/buscarProductoNombre/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pBuscarProductoNombre');
	}
});

routerProducto.get('/buscarProductosCategoria/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pBuscarProductosCategoria');
	}
});

export default routerProducto;
