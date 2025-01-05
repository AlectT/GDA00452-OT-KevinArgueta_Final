import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import {
	BotonVerCarrito,
	ContenedorBotonFormulario,
	ContenedorCompra,
	ContenedorInputFormulario,
	ContenedorResumen,
	ContenedorSeparador,
	Datos,
	DatoSolicitado,
	DatosResumen,
	EncabezadoResumen,
	InputDato,
} from '../elementos/ElementosFormularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faArrowRight,
	faCalendar,
	faCreditCard,
	faEdit,
	faEnvelope,
	faMapMarkerAlt,
	faPhone,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import useObtenerDatos from '../hooks/useObtenerDatos';
import formatearCantidad from '../hooks/ConvertirMoneda';
import { useAuth } from '../contextos/contextoSesion';
import esquemaComprarCarrito from '../esquemas/esquemaComprarCarrito';
import { ErrorCantidad } from '../elementos/ElementosProductos';

const ComprarCarrito = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerCarritoDetallado/${id}`);
	const { cSesion, idU } = useAuth();
	const [verCarrito, cambiarVerCarrito] = useState(false);
	const [verFormulario, cambiarVerFormulario] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(esquemaComprarCarrito),
	});

	const onSubmit = (body) => {
		body.estado = 12;
		fetch(`http://localhost:4000/actualizarOrden/${id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
				Authorization: cSesion,
			},
		})
			.then((res) => navigate(`/tienda/historialCompras/${idU}`))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (datos) {
			if (datos.length === 0 || datos[0].idUsuarios !== Number(idU)) {
				navigate('/tienda');
			}
		}
	}, [datos, idU, navigate]);

	return (
		<>
			<Helmet>
				<title>Datos de compra</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain>
					<ContenedorCompra method="PUT" onSubmit={handleSubmit(onSubmit)}>
						<ContenedorSeparador $verSeccion={verFormulario ? true : false} $seccion={'carrito'}>
							<BotonVerCarrito
								$seccion={'carrito'}
								onClick={() => {
									cambiarVerCarrito(true);
									cambiarVerFormulario(false);
								}}
							>
								Ver Carrito <FontAwesomeIcon icon={faArrowRight} />
							</BotonVerCarrito>
							<ContenedorInputFormulario>
								<DatoSolicitado>
									<span>Nombre</span>
									<FontAwesomeIcon icon={faUser} />
									{errors.nombre && (
										<ErrorCantidad $detalle $nombre>
											{errors.nombre.message}
										</ErrorCantidad>
									)}
								</DatoSolicitado>
								{datos && (
									<InputDato
										type="text"
										{...register('nombre', {
											value: datos[0].nombre_completo,
										})}
									/>
								)}
							</ContenedorInputFormulario>
							<ContenedorInputFormulario>
								<DatoSolicitado>
									<span>Direccion</span>
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									{errors.direccion && (
										<ErrorCantidad $detalle>{errors.direccion.message}</ErrorCantidad>
									)}
								</DatoSolicitado>
								{datos && (
									<InputDato
										type="text"
										{...register('direccion', {
											value: datos[0].direccion,
										})}
									/>
								)}
							</ContenedorInputFormulario>
							<ContenedorInputFormulario>
								<DatoSolicitado>
									<span>Telefono</span>
									<FontAwesomeIcon icon={faPhone} />
									{errors.telefono && <ErrorCantidad $detalle>{errors.telefono.message}</ErrorCantidad>}
								</DatoSolicitado>
								{datos && (
									<InputDato
										type="text"
										{...register('telefono', {
											value: datos[0].telefono,
											onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
										})}
									/>
								)}
							</ContenedorInputFormulario>
							<ContenedorInputFormulario>
								<DatoSolicitado>
									<span>Correo</span>
									<FontAwesomeIcon icon={faEnvelope} />
									{errors.correo && <ErrorCantidad $detalle>{errors.correo.message}</ErrorCantidad>}
								</DatoSolicitado>
								{datos && (
									<InputDato
										type="text"
										{...register('correo', {
											value: datos[0].correo_electronico,
										})}
									/>
								)}
							</ContenedorInputFormulario>
							<ContenedorInputFormulario>
								<DatoSolicitado>
									<span>Fecha</span>
									<FontAwesomeIcon icon={faCalendar} />
									{errors.fecha && <ErrorCantidad $detalle>{errors.fecha.message}</ErrorCantidad>}
								</DatoSolicitado>
								<InputDato type="date" {...register('fecha')} />
							</ContenedorInputFormulario>
							<ContenedorBotonFormulario>
								{datos && datos[0].nombreEstado === 'Orden en proceso' && (
									<button type="submit">
										Comprar <FontAwesomeIcon icon={faCreditCard} />
									</button>
								)}
								{datos && datos[0].nombreEstado === 'Solicitud de orden' && (
									<button type="submit">
										Editar <FontAwesomeIcon icon={faEdit} />
									</button>
								)}
							</ContenedorBotonFormulario>
						</ContenedorSeparador>
						<ContenedorSeparador
							$resumen
							$verSeccion={verCarrito ? true : false}
							$seccion={'formulario'}
						>
							<BotonVerCarrito
								$seccion={'formulario'}
								onClick={() => {
									cambiarVerFormulario(true);
									cambiarVerCarrito(false);
								}}
							>
								<FontAwesomeIcon icon={faArrowLeft} /> Llenar formulario
							</BotonVerCarrito>
							{datos && datos[0] && (
								<>
									<EncabezadoResumen $encabezado>Resumen de compra</EncabezadoResumen>
									<ContenedorResumen>
										{datos.map((producto, index) => {
											return (
												<DatosResumen key={index}>
													<div>
														<Datos>{producto.nombreProducto}</Datos>
														<Datos $cantidad> x {producto.cantidad}</Datos>
													</div>
													<Datos $derecha>{formatearCantidad(producto.subtotal)}</Datos>
												</DatosResumen>
											);
										})}
									</ContenedorResumen>
									<EncabezadoResumen>
										<Datos $total>Total</Datos>
										<Datos $derecha $total>
											{formatearCantidad(datos[0].total_orden)}
										</Datos>
									</EncabezadoResumen>
								</>
							)}
						</ContenedorSeparador>
					</ContenedorCompra>
				</ContenedorMain>
			</ContenedorPagina>
		</>
	);
};

export default ComprarCarrito;
