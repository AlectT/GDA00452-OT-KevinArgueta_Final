import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	ContenedorFormularioAgregar,
	ContenedorInputFormulario,
	DatoSolicitado,
	InputDato,
	ContenedorBotonFormulario,
	InputSelect,
} from '../elementos/ElementosFormularios';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useAuth } from '../contextos/contextoSesion';
import { useNavigate } from 'react-router-dom';
import esquemaAgregarUsuario from '../esquemas/esquemaAgregarUsuario';
import { ErrorCantidad } from '../elementos/ElementosProductos';
import esquemaActualizarUsuario from '../esquemas/esquemaActualizarUsuario';

const FormularioAgregarUsuario = ({ dataActualizar, cambiarEstadoAlerta, cambiarAlerta }) => {
	const { datos } = useObtenerDatos('http://localhost:4000/obtenerClientes');
	const [data, cambiarData] = useState();
	const { cSesion, rol } = useAuth();
	const [clienteHabilitado, cambiarClienteHabilitado] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (rol && rol !== 'O') {
			navigate('/tienda');
		}
	}, [rol, navigate]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(!data ? esquemaAgregarUsuario : esquemaActualizarUsuario),
	});

	useEffect(() => {
		if (dataActualizar && dataActualizar[0]) {
			return cambiarData(dataActualizar[0]);
		}
	}, [dataActualizar, cambiarData]);

	const onSubmit = (body) => {
		if (!data) {
			if (body.rol === 2) {
				body.cliente = null;
			}
			fetch('http://localhost:4000/agregarUsuario', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json',
					Authorization: cSesion,
				},
			})
				.then((res) => {
					if (res.status === 400) {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'error',
							mensaje: 'Correo ya registrado',
						});
					} else {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'exito',
							mensaje: 'Usuario agregado correctamente',
						});
						reset();
					}
				})
				.catch((error) => console.log(error));
		} else {
			fetch(`http://localhost:4000/actualizarUsuario/${data.idUsuarios}`, {
				method: 'PUT',
				body: JSON.stringify(body),
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json',
					Authorization: cSesion,
				},
			})
				.then((res) => {
					if (res.status === 400) {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'error',
							mensaje: 'No se pudo actualizar la información',
						});
					} else {
						window.location.reload(true);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	const habilitarInput = (e) => {
		if (Number(e) === 2) {
			cambiarClienteHabilitado(true);
		}
		if (Number(e) === 1) {
			cambiarClienteHabilitado(false);
		}
	};

	return (
		datos !== null && (
			<ContenedorFormularioAgregar onSubmit={handleSubmit(onSubmit)} $usuario>
				<ContenedorInputFormulario $usuario>
					<DatoSolicitado>
						Rol del usuario
						{errors.rol && <ErrorCantidad $detalle>{errors.rol.message}</ErrorCantidad>}
					</DatoSolicitado>
					{!data ? (
						<InputSelect {...register('rol')} onChange={(e) => habilitarInput(e.target.value)}>
							<option value={1}>Cliente</option>
							<option value={2}>Operador</option>
						</InputSelect>
					) : (
						<InputDato readOnly $read value={data.nombreRol} />
					)}
				</ContenedorInputFormulario>
				{data && data.idRol !== 2 && (
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Cliente
							{errors.cliente && <ErrorCantidad $detalle>{errors.cliente.message}</ErrorCantidad>}
						</DatoSolicitado>
						{!data ? (
							<InputSelect disabled={clienteHabilitado} {...register('cliente')}>
								<option value="" selected disabled>
									{!clienteHabilitado && 'Seleccione un cliente...'}
									{clienteHabilitado && 'No se requiere para ser operador'}
								</option>
								{datos.map((cliente) => {
									return (
										<option key={cliente.idClientes} value={cliente.idClientes}>
											{cliente.email}
										</option>
									);
								})}
							</InputSelect>
						) : (
							data.idRol !== 2 && <InputDato readOnly $read value={data.correoCliente} />
						)}
					</ContenedorInputFormulario>
				)}
				{!data && (
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Cliente
							{errors.cliente && <ErrorCantidad $detalle>{errors.cliente.message}</ErrorCantidad>}
						</DatoSolicitado>
						{!data ? (
							<InputSelect disabled={clienteHabilitado} {...register('cliente')}>
								<option value="" selected disabled>
									{!clienteHabilitado && 'Seleccione un cliente...'}
									{clienteHabilitado && 'No se requiere para ser operador'}
								</option>
								{datos.map((cliente) => {
									return (
										<option key={cliente.idClientes} value={cliente.idClientes}>
											{cliente.email}
										</option>
									);
								})}
							</InputSelect>
						) : (
							data.idRol !== 2 && <InputDato readOnly $read value={data.correoCliente} />
						)}
					</ContenedorInputFormulario>
				)}
				<ContenedorInputFormulario $usuario>
					<DatoSolicitado>
						Correo
						{errors.correo && <ErrorCantidad $detalle>{errors.correo.message}</ErrorCantidad>}
					</DatoSolicitado>
					{!data ? (
						<InputDato type="text" {...register('correo')} $usuario />
					) : (
						<InputDato readOnly $read value={data.correo_electronico} />
					)}
				</ContenedorInputFormulario>
				<ContenedorInputFormulario $usuario>
					<DatoSolicitado>
						Nombre
						{errors.nombre && <ErrorCantidad $detalle>{errors.nombre.message}</ErrorCantidad>}
					</DatoSolicitado>
					<InputDato
						type="text"
						{...register('nombre', {
							value: data && data.nombre_completo,
						})}
						$usuario
					/>
				</ContenedorInputFormulario>
				{!data && (
					<>
						<ContenedorInputFormulario $usuario>
							<DatoSolicitado>
								Contraseña
								{errors.password && <ErrorCantidad $detalle>{errors.password.message}</ErrorCantidad>}
							</DatoSolicitado>
							<InputDato type="password" {...register('password')} $usuario />
						</ContenedorInputFormulario>
						<ContenedorInputFormulario $usuario>
							<DatoSolicitado>
								Confirmar contraseña
								{errors.confirmarPassword && (
									<ErrorCantidad $detalle>{errors.confirmarPassword.message}</ErrorCantidad>
								)}
							</DatoSolicitado>
							<InputDato type="password" {...register('confirmarPassword')} $usuario />
						</ContenedorInputFormulario>
					</>
				)}
				<ContenedorInputFormulario $usuario>
					<DatoSolicitado>
						Telefono
						{errors.telefono && <ErrorCantidad $detalle>{errors.telefono.message}</ErrorCantidad>}
					</DatoSolicitado>
					<InputDato
						type="text"
						{...register('telefono', {
							value: data && data.telefono,
							onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
						})}
						$usuario
					/>
				</ContenedorInputFormulario>
				<ContenedorInputFormulario $usuario>
					<DatoSolicitado>
						Fecha nacimiento
						{errors.fechaNacimiento && (
							<ErrorCantidad $detalle>{errors.fechaNacimiento.message}</ErrorCantidad>
						)}
					</DatoSolicitado>
					{!data ? (
						<InputDato type="date" $usuario {...register('fechaNacimiento')} />
					) : (
						<InputDato readOnly $read value={data.fecha_nacimiento} />
					)}
				</ContenedorInputFormulario>
				<ContenedorBotonFormulario>
					<button type="submit">{!data ? 'Agregar' : 'Actualizar'} Usuario</button>
				</ContenedorBotonFormulario>
			</ContenedorFormularioAgregar>
		)
	);
};

export default FormularioAgregarUsuario;
