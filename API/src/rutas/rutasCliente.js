import { Router } from 'express';
import { agregarCliente, actualizarCliente } from '../controladores/controladorCliente.js';
import obtenerData from '../hooks/obtenerData.js';
import obtenerDataId from '../hooks/obtenerDataID.js';

const routerCliente = Router();

// Rutas de operador
routerCliente.get('/obtenerClientes', (req, res) => {
	if (req.rol === 'O') {
		obtenerData(req, res, 'Cliente');
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

routerCliente.post('/agregarCliente', (req, res) => {
	if (req.rol === 'O') {
		agregarCliente(req, res);
	} else {
		return res.status(401).send('No tienes permisos operador');
	}
});

// Rutas de clientes y operadores
routerCliente.put('/actualizarCliente/:id', (req, res) => {
	if (req.rol) {
		actualizarCliente(req, res);
	}
});

routerCliente.get('/obtenerClienteID/:id', (req, res) => {
	if (req.rol) {
		obtenerDataId(req, res, 'pClienteID');
	}
});

export default routerCliente;
