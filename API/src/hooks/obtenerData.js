import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const obtenerData = async (req, res, tabla) => {
	try {
		const data = await sequelize.query(`select * from v${tabla};`, {
			type: QueryTypes.SELECT,
		});
		res.status(200).send(data);
	} catch (err) {
		console.log('Error durante el proceso');
		return res.status(500).send(err);
	}
};

export default obtenerData;
