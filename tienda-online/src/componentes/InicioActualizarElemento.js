import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import useObtenerDatos from '../hooks/useObtenerDatos';
import {
	BotonActualizar,
	CambiarEstadosActualizar,
	ContenedorAccionesActualizar,
	ContenedorActualizarElementos,
	ElementosActualizar,
	NombreActualizar,
} from '../elementos/ElementosActualizar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contextos/contextoSesion';

const InicioActualizarElementos = () => {
	const { elemento } = useParams();
	const navigate = useNavigate('');
	const { cSesion } = useAuth();
	// Lógica para volver dinámico el componente y evitar repetir el código por cada formulario
	let url;
	switch (elemento) {
		case 'producto':
			url = `http://localhost:4000/obtenerProductos`;
			break;
		case 'categoria':
			url = `http://localhost:4000/obtenerCategorias`;
			break;
		case 'cliente':
			url = `http://localhost:4000/obtenerClientes`;
			break;
		case 'usuario':
			url = `http://localhost:4000/obtenerUsuarios`;
			break;
		default:
			navigate('/tienda');
			break;
	}

	const { datos } = useObtenerDatos(url);

	// Lógica para cambiar el estado del elemento
	const cambiarEstado = (id, estado) => {
		const body = {
			estado: estado,
		};

		let urlPeticion;

		// Lógica para volver dinámica la petición para cambiar estados a través del API
		switch (elemento) {
			case 'producto':
				urlPeticion = `http://localhost:4000/cambiarEstadoProducto/${id}`;
				break;
			case 'categoria':
				urlPeticion = `http://localhost:4000/cambiarEstadoCategoria/${id}`;
				break;
			case 'usuario':
				urlPeticion = `http://localhost:4000/cambiarEstadoUsuario/${id}`;
				break;
			default:
				navigate('/tienda');
				break;
		}

		fetch(urlPeticion, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
				Authorization: cSesion,
			},
		})
			.then((res) => {
				if (estado === 6) {
					fetch(`http://localhost:4000/limpiarCarritoActual/${id}`, {
						method: 'PUT',
						body: JSON.stringify(body),
						headers: {
							'Content-type': 'application/json',
							accept: 'application/json',
							Authorization: cSesion,
						},
					});
				}
			})
			.then(() => window.location.reload(true))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Helmet>
				<title>Actualizar {elemento && elemento}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain>
					<ContenedorActualizarElementos>
						{datos &&
							datos.map((info) => {
								// Generalización de datos
								if (info.nombre_completo) {
									info.nombre = info.nombre_completo;
								} else if (info.idClientes) {
									info.nombre = info.email;
								}

								// Generalización de ID's
								if (info.idProductos) {
									info.id = info.idProductos;
								} else if (info.idCategoriaProductos) {
									info.id = info.idCategoriaProductos;
								} else if (info.idUsuarios) {
									info.id = info.idUsuarios;
								} else if (info.idClientes) {
									info.id = info.idClientes;
								}

								return (
									<ElementosActualizar key={info.id}>
										<NombreActualizar>{info.nombre}</NombreActualizar>
										<ContenedorAccionesActualizar>
											<BotonActualizar href={`/tienda/actualizarElemento/${elemento}/${info.id}`}>
												<FontAwesomeIcon icon={faEdit} />
											</BotonActualizar>
											{info.idEstados &&
												(info.idEstados === 1 || info.idEstados === 3 || info.idEstados === 5) && (
													<CambiarEstadosActualizar
														type="button"
														onClick={() => cambiarEstado(info.id, Number(info.idEstados) + 1)}
													>
														Desactivar
													</CambiarEstadosActualizar>
												)}
											{info.idEstados &&
												(info.idEstados === 2 || info.idEstados === 4 || info.idEstados === 6) && (
													<CambiarEstadosActualizar
														type="button"
														$activar
														onClick={() => cambiarEstado(info.id, Number(info.idEstados) - 1)}
													>
														Activar
													</CambiarEstadosActualizar>
												)}
										</ContenedorAccionesActualizar>
									</ElementosActualizar>
								);
							})}
					</ContenedorActualizarElementos>
				</ContenedorMain>
			</ContenedorPagina>
		</>
	);
};

export default InicioActualizarElementos;
