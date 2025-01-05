import { Router } from 'express';
import {
	agregarOrden,
	actualizarOrden,
	obtenerCarritoActual,
	limpiarCarrito,
} from '../controladores/controladorOrden.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';
import cambiarEstado from '../hooks/cambiarEstado.js';

const routerOrden = Router();

// Rutas de operador
routerOrden.get('/obtenerOrdenes', (req, res) => {
	if (req.rol === 'O') {
		obtenerData(res, res, 'Orden');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

// Rutas de clientes y operadores
routerOrden.post('/agregarOrden', (req, res) => {
	if (req.rol) {
		agregarOrden(req, res);
	}
});

routerOrden.put('/actualizarOrden/:id', (req, res) => {
	if (req.rol) {
		actualizarOrden(req, res);
	}
});

routerOrden.patch('/cambiarEstadoOrden/:id', (req, res) => {
	if (req.rol) {
		cambiarEstado(req, res, 'Orden');
	}
});

routerOrden.get('/obtenerOrdenID/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pOrdenID');
	}
});

routerOrden.get('/obtenerCarrito/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pCarritoClientes');
	}
});

routerOrden.get('/obtenerCarritoActual/:id', (req, res) => {
	if (req.rol) {
		obtenerCarritoActual(req, res);
	}
});

routerOrden.get('/obtenerCarritosUsuario/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pHistorialCompras');
	}
});

routerOrden.get('/obtenerCarritoDetallado/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pCarritoDetallado');
	}
});

routerOrden.put('/limpiarCarrito/:id', (req, res) => {
	if (req.rol) {
		limpiarCarrito(req, res);
	}
});

export default routerOrden;
