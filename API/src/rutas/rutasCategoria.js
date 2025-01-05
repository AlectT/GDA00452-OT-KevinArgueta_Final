import { Router } from 'express';
import {
	agregarCategoria,
	actualizarCategoria,
} from '../controladores/controladorCategoria.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';
import cambiarEstado from '../hooks/cambiarEstado.js';

const routerCategoria = Router();

// Rutas de operador
routerCategoria.post('/agregarCategoria', (req, res) => {
	if (req.rol === 'O') {
		agregarCategoria(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerCategoria.put('/actualizarCategoria/:id', (req, res) => {
	if (req.rol === 'O') {
		actualizarCategoria(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerCategoria.patch('/cambiarEstadoCategoria/:id', (req, res) => {
	if (req.rol === 'O') {
		cambiarEstado(req, res, 'Categoria');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

// Rutas de clientes y operadores
routerCategoria.get('/obtenerCategorias', (req, res) => {
	if (req.rol) {
		obtenerData(res, res, 'CategoriaProductos');
	}
});

routerCategoria.get('/obtenerCategoriaID/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pCategoriaProductosID');
	}
});

export default routerCategoria;
