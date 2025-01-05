import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const agregarRol = async (req, res) => {
	try {
		const data = req.body;

		await sequelize.query('exec pCrearRol @nombreRol = :rol', {
			replacements: {
				rol: data.rol,
			},
			type: QueryTypes.INSERT,
		});

		res.status(201).send('Agregado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

const actualizarRol = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query('exec pActualizarRol @rol = :rol, @nombre = :nombre', {
			replacements: {
				rol: Number(id),
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

export { agregarRol, actualizarRol };
