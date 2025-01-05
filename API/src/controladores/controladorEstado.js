import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const agregarEstado = async (req, res) => {
	try {
		const data = req.body;

		await sequelize.query('exec pCrearEstado @nombre = :nombre', {
			replacements: {
				nombre: data.nombre,
			},
			type: QueryTypes.INSERT,
		});

		res.status(201).send('Agregado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

const actualizarEstado = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query('exec pActualizarEstado @estado = :estado, @nombre = :nombre', {
			replacements: {
				estado: Number(id),
				nombre: data.nombre,
			},
			type: QueryTypes.PUT,
		});
		res.status(201).send('Actualizado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

export { agregarEstado, actualizarEstado };
