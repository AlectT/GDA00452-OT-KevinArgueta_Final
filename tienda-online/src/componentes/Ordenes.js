import React, { useState, useEffect } from 'react';
import {
	ContenedorOrdenes,
	ContenedorOrden,
	ContenedorDatosOrden,
	ContenedorDatos,
	DatosOrden,
	NumeroOrden,
	ContenedorAccionesOrden,
	AccionOrden,
} from '../elementos/ElementosOrdenes';
import { useAuth } from '../contextos/contextoSesion';

const Ordenes = ({ ordenes, datos }) => {
	const { rol, cSesion } = useAuth();
	const [carritos, cambiarCarritos] = useState(null);

	useEffect(() => {
		if (ordenes) {
			let nuevoArray = [];
			let arrayTemporal = [];
			for (let i = 0; i < ordenes.length; i++) {
				arrayTemporal = nuevoArray.filter(
					(resp) => resp['nombreEstado'] === ordenes[i]['nombreEstado'],
				);
				if (arrayTemporal.length > 0) {
					nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]['orden'].push(ordenes[i]);
				} else {
					nuevoArray.push({
						nombreEstado: ordenes[i]['nombreEstado'],
						orden: [ordenes[i]],
					});
				}
			}
			cambiarCarritos(nuevoArray.reverse());
		}

		if (datos && rol) {
			if (rol === 'O') {
				let nuevoArray = [];
				let arrayTemporal = [];
				for (let i = 0; i < datos.length; i++) {
					arrayTemporal = nuevoArray.filter((resp) => resp['nombre'] === datos[i]['nombre']);
					if (arrayTemporal.length > 0) {
						nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]['orden'].push(datos[i]);
					} else {
						nuevoArray.push({
							nombre: datos[i]['nombre'],
							orden: [datos[i]],
						});
					}
				}
				cambiarCarritos(nuevoArray.reverse());
			}
		}
	}, [datos, ordenes, rol]);

	const entregarPedido = (idOrden) => {
		const body = {
			estado: 10,
		};
		fetch(`http://localhost:4000/cambiarEstadoOrden/${idOrden}`, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
				Authorization: cSesion,
			},
		})
			.then((res) => {
				window.location.reload(true);
			})
			.catch((err) => console.log(err));
	};

	const cancelarRechazarPedido = (idOrden) => {
		const body = {
			estado: rol === 'C' ? 11 : 8,
		};
		fetch(`http://localhost:4000/cambiarEstadoOrden/${idOrden}`, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
				Authorization: cSesion,
			},
		})
			.then(() => {
				fetch(`http://localhost:4000/limpiarCarrito/${idOrden}`, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						accept: 'application/json',
						Authorization: cSesion,
					},
				}).then((res) => {
					window.location.reload(true);
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<ContenedorOrdenes>
			{carritos &&
				carritos !== null &&
				carritos.map((orden) => {
					const ordenesEstado = orden.orden;
					return ordenesEstado.map((carrito, index) => {
						if (carrito.nombre) {
							carrito.nombreEstado = carrito.nombre;
						}
						return (
							carrito.nombreEstado !== 'Orden en proceso' && (
								<ContenedorOrden key={index}>
									<ContenedorDatosOrden>
										<ContenedorDatos>
											<DatosOrden $datos $estado>
												{carrito.nombreEstado}
											</DatosOrden>
										</ContenedorDatos>
										<ContenedorDatos>
											<DatosOrden>Nombre:</DatosOrden>
											<DatosOrden $datos>{carrito.nombre_completo}</DatosOrden>
										</ContenedorDatos>
										<ContenedorDatos>
											<DatosOrden>Correo:</DatosOrden>
											<DatosOrden $datos>{carrito.correo_electronico}</DatosOrden>
										</ContenedorDatos>
										<ContenedorDatos>
											<DatosOrden>Direccion</DatosOrden>
											<DatosOrden $datos>{carrito.direccion}</DatosOrden>
										</ContenedorDatos>
										<ContenedorDatos>
											<DatosOrden>Telefono</DatosOrden>
											<DatosOrden $datos>{carrito.telefono}</DatosOrden>
										</ContenedorDatos>
										<ContenedorDatos>
											<DatosOrden>Fecha</DatosOrden>
											<DatosOrden $datos>{carrito.fecha_entrega}</DatosOrden>
										</ContenedorDatos>
									</ContenedorDatosOrden>
									<NumeroOrden>#{carrito.idOrden}</NumeroOrden>
									<ContenedorAccionesOrden>
										{carrito.nombreEstado === 'Solicitud de orden' && (
											<>
												{rol && rol === 'C' ? (
													<>
														<AccionOrden $editar href={`/tienda/carrito/comprar/${carrito.idOrden}`}>
															Editar
														</AccionOrden>
														{carrito.nombreEstado !== 'Orden cancelada' &&
															carrito.nombreEstado !== 'Orden rechazada' && (
																<AccionOrden $ver href={`/tienda/carrito/${carrito.idOrden}`}>
																	Ver Carrito
																</AccionOrden>
															)}
														<button onClick={() => cancelarRechazarPedido(carrito.idOrden)}>Cancelar</button>
													</>
												) : (
													<>
														<AccionOrden onClick={() => entregarPedido(carrito.idOrden)}>
															Entregar
														</AccionOrden>
														{carrito.nombreEstado !== 'Orden cancelada' &&
															carrito.nombreEstado !== 'Orden rechazada' && (
																<AccionOrden $ver href={`/tienda/carrito/${carrito.idOrden}`}>
																	Ver Carrito
																</AccionOrden>
															)}
														<button onClick={() => cancelarRechazarPedido(carrito.idOrden)}>Rechazar</button>
													</>
												)}
											</>
										)}
									</ContenedorAccionesOrden>
								</ContenedorOrden>
							)
						);
					});
				})}
		</ContenedorOrdenes>
	);
};

export default Ordenes;
