import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const cambiarEstado = async (req, res, tabla) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query(
			`exec pCambiarEstado${tabla} @elemento = :elemento, @estado = :estado;`,
			{
				replacements: {
					elemento: Number(id),
					estado: data.estado,
				},
				type: QueryTypes.PATCH,
			},
		);
		res.status(201).send('Actualizado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

export default cambiarEstado;
