import { Router } from 'express';
import { agregarEstado, actualizarEstado } from '../controladores/controladorEstado.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';

const routerEstado = Router();

// Rutas de operador
routerEstado.get('/obtenerEstados', (req, res) => {
	if (req.rol === 'O') {
		obtenerData(req, res, 'Estado');
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerEstado.post('/agregarEstado', (req, res) => {
	if (req.rol === 'O') {
		agregarEstado(req, res);
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerEstado.put('/actualizarEstado/:id', (req, res) => {
	if (req.rol === 'O') {
		actualizarEstado(req, res);
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerEstado.get('/obtenerEstadoID/:id', (req, res) => {
	if (req.rol === 'O') {
		obtenerDataId(req, res, 'pEstadoID');
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

export default routerEstado;
