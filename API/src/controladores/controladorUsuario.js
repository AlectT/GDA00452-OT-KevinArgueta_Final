import sequelize from '../config/conexion.js';
import { QueryTypes } from '@sequelize/core';
import bcrypt from 'bcrypt';

const agregarUsuario = async (req, res) => {
	try {
		const data = req.body;
		//Query para evitar correos repetidos
		await sequelize
			.query('exec pBuscarUsuarioCorreo @correo = :correo;', {
				replacements: {
					correo: data.correo,
				},
				type: QueryTypes.SELECT,
			})
			.then((usuario) => {
				function calcularEdad(fecha) {
					var hoy = new Date();
					var nacimiento = new Date(fecha);
					var edad = hoy.getFullYear() - nacimiento.getFullYear();
					var m = hoy.getMonth() - nacimiento.getMonth();

					if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
						edad--;
					}

					return edad;
				}
				// Si el correo ya existe entonces no lo agrega
				if (usuario[0]) {
					res.status(400).send('Ya existe un usuario con ese correo');
				} else {
					const edadActual = calcularEdad(data.fechaNacimiento);
					if (edadActual >= 18) {
						const date = new Date().toISOString();
						//Agregar usuario
						bcrypt.hash(data.password, 8).then(async (hashPassword) => {
							await sequelize.query(
								'exec pCrearUsuario @rol = :rol, @estado = :estado, @cliente = :cliente, @correo = :correo, @nombre = :nombre, @password = :password, @telefono = :telefono, @fecha_nacimiento = :fechaNacimiento, @fecha_creacion = :fechaCreacion;',
								{
									replacements: {
										rol: data.rol,
										estado: 5,
										cliente: data.cliente,
										correo: data.correo,
										nombre: data.nombre,
										password: hashPassword,
										telefono: data.telefono,
										fechaNacimiento: data.fechaNacimiento,
										fechaCreacion: date,
									},
									type: QueryTypes.INSERT,
								},
							);
							res.status(201).send('Agregado exitosamente');
						});
					} else {
						res.status(400).send('El usuario debe de ser mayor de edad');
					}
				}
			});
	} catch (err) {
		console.log('Error durante el procedimiento');
		return res.status(500).send(err);
	}
};

const actualizarUsuario = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		await sequelize.query(
			'exec pActualizarUsuario @usuario = :usuario, @nombre = :nombre, @telefono = :telefono;',
			{
				replacements: {
					usuario: Number(id),
					nombre: data.nombre,
					telefono: data.telefono,
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

const limpiarCarritoActual = async (req, res) => {
	try {
		const { id } = req.params;
		await sequelize
			.query('exec pOrdenActual @usuario = :usuario;', {
				replacements: {
					usuario: Number(id),
				},
				type: QueryTypes.SELECT,
			})
			.then((orden) => {
				if (orden[0].total_orden !== 0) {
					sequelize
						.query('exec pCarritoClientes @id = :orden;', {
							replacements: {
								orden: Number(orden[0].idOrden),
							},
							type: QueryTypes.SELECT,
						})
						.then((carrito) => {
							carrito.forEach(async (detalle) => {
								await sequelize
									.query('exec pOrdenDetallesID @id = :ordenDetalle;', {
										replacements: {
											ordenDetalle: Number(detalle.idOrdenDetalles),
										},
										type: QueryTypes.SELECT,
									})
									.then(async (detalles) => {
										// Query para actualizar el stock
										await sequelize
											.query('exec pObtenerStock @producto = :producto;', {
												replacements: {
													producto: Number(detalles[0].idProductos),
												},
												type: QueryTypes.SELECT,
											})
											.then((producto) => {
												// Actualizar stock
												sequelize.query(
													'exec pActualizarStock @producto = :producto, @stock = :stock, @estado = :estado;',
													{
														replacements: {
															producto: Number(detalles[0].idProductos),
															stock: Number(producto[0].stock) + Number(detalles[0].cantidad),
															estado: 1,
														},
														type: QueryTypes.PUT,
													},
												);
											})
											.then(() => {
												//Borrar el detalle
												sequelize.query('exec pEliminarDetalle @detalle = :detalle', {
													replacements: {
														detalle: detalles[0].idOrdenDetalles,
													},
													type: QueryTypes.DELETE,
												});
											});
									});
							});
						})
						.then(() => {
							sequelize.query('exec pActualizarTotalOrden @orden = :orden, @total = :total', {
								replacements: {
									orden: Number(orden[0].idOrden),
									total: 0,
								},
								type: QueryTypes.PUT,
							});
							res.status(201).send('Carrito limpiado');
						});
				}
			});
	} catch (err) {
		console.log('Error durante el proceso');
		return res.status(500).send(err);
	}
};

export { agregarUsuario, actualizarUsuario, limpiarCarritoActual };
