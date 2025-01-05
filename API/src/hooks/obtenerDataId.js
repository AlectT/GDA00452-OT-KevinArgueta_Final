import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const obtenerDataId = async (req, res, procedimiento) => {
	try {
		const { id } = req.params;
		const dataId = await sequelize.query(`exec ${procedimiento} @id = :idBuscar;`, {
			replacements: {
				idBuscar: id,
			},
			type: QueryTypes.SELECT,
		});
		res.status(200).send(dataId);
	} catch (err) {
		console.log('Error durante el proceso');
		return res.status(500).send(err);
	}
};

export default obtenerDataId;
