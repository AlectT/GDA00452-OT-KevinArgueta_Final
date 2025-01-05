import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';

const agregarProducto = async (req, res) => {
	try {
		const data = req.body;
		const date = new Date().toISOString();

		await sequelize.query(
			'exec pCrearProducto @categoria = :categoria, @usuario = :usuario, @estado = :estado, @nombre = :nombre, @marca = :marca, @codigo = :codigo, @stock = :stock, @precio = :precio, @fecha_creacion = :fechaCreacion, @foto = :foto;',
			{
				replacements: {
					categoria: data.categoria,
					usuario: data.usuario,
					estado: 1,
					nombre: data.nombre,
					marca: data.marca,
					codigo: data.codigo,
					stock: data.stock,
					precio: data.precio,
					fechaCreacion: date,
					foto: data.foto,
				},
				type: QueryTypes.INSERT,
			},
		);

		res.status(201).send('Agregado exitosamente');
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

const actualizarProducto = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query(
			'exec pActualizarProducto @producto = :producto, @categoria = :categoria, @nombre = :nombre, @marca = :marca, @codigo = :codigo, @stock = :stock, @precio = :precio, @foto = :foto;',
			{
				replacements: {
					producto: Number(id),
					categoria: data.categoria,
					nombre: data.nombre,
					marca: data.marca,
					codigo: data.codigo,
					stock: data.stock,
					precio: data.precio,
					foto: data.foto,
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

export { agregarProducto, actualizarProducto };
