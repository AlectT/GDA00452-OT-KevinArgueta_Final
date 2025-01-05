import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const agregarCategoria = async (req, res) => {
	try {
		const data = req.body;
		const date = new Date().toISOString();

		await sequelize.query(
			'exec pCrearCategoriaP @usuario = :usuario, @nombre = :nombre, @estado = :estado, @fecha_creacion = :fechaCreacion;',
			{
				replacements: {
					usuario: data.usuario,
					nombre: data.nombre,
					estado: 3,
					fechaCreacion: date,
				},
				type: QueryTypes.INSERT,
			},
		);

		res.status(201).send('Agregado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

const actualizarCategoria = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query(
			'exec pActualizarCategoria @categoria = :categoria, @nombre = :nombre;',
			{
				replacements: {
					categoria: Number(id),
					nombre: data.nombre,
				},
				type: QueryTypes.PUT,
			},
		);
		res.status(201).send('Actualizado exitosamente');
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

export { agregarCategoria, actualizarCategoria };
