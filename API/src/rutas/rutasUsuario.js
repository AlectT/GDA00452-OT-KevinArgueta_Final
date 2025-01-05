import { Router } from 'express';
import {
	agregarUsuario,
	actualizarUsuario,
	limpiarCarritoActual,
} from '../controladores/controladorUsuario.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';
import cambiarEstado from '../hooks/cambiarEstado.js';

const routerUsuario = Router();

// Rutas para operadores
routerUsuario.get('/obtenerUsuarios', (req, res) => {
	if (req.rol === 'O') {
		obtenerData(req, res, 'Usuario');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerUsuario.post('/agregarUsuario', (req, res) => {
	if (req.rol === 'O') {
		agregarUsuario(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerUsuario.patch('/cambiarEstadoUsuario/:id', (req, res) => {
	if (req.rol === 'O') {
		cambiarEstado(req, res, 'Usuario');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerUsuario.put('/limpiarCarritoActual/:id', (req, res) => {
	if (req.rol === 'O') {
		limpiarCarritoActual(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

// Rutas de clientes y operadores
routerUsuario.get('/obtenerUsuarioID/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pUsuarioID');
	}
});

routerUsuario.put('/actualizarUsuario/:id', (req, res) => {
	if (req.rol) {
		actualizarUsuario(req, res);
	}
});

routerUsuario.get('/obtenerHistorialCarrito/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pHistorialCompras');
	}
});

export default routerUsuario;
