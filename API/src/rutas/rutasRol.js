import { Router } from 'express';
import { agregarRol, actualizarRol } from '../controladores/controladorRol.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';

const routerRol = Router();

// Rutas de operador
routerRol.get('/obtenerRoles', (req, res) => {
	if (req.rol === 'O') {
		obtenerData(req, res, 'Rol');
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerRol.post('/agregarRol', (req, res) => {
	if (req.rol === 'O') {
		agregarRol(req, res);
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerRol.put('/actualizarRol/:id', (req, res) => {
	if (req.rol === 'O') {
		actualizarRol(req, res);
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

routerRol.get('/obtenerRolID/:id', (req, res) => {
	if (req.rol === 'O') {
		obtenerDataId(req, res, 'pRolID');
	} else {
		return res.status(401).send('No tiene permisos de Operador');
	}
});

export default routerRol;
