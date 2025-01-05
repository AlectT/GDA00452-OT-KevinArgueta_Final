import React from 'react';
import {
	ContenedorDatosUsuario,
	DatoUsuario,
	BotonEditarPerfil,
	FormularioEditarDatosUsuario,
	InputEditarUsuario,
} from './../elementos/ElementosPerfil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import esquemaEditarUsuario from '../esquemas/esquemaEditarUsuario';
import { ErrorCantidad } from '../elementos/ElementosProductos';
import { useAuth } from '../contextos/contextoSesion';

const FormularioEditarUsuario = ({ datos, estadoFormulario, cambiarEstadoFormulario }) => {
	const { cSesion, idU } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(esquemaEditarUsuario),
	});

	const onSubmit = (body) => {
		fetch(`http://localhost:4000/actualizarUsuario/${idU}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
				Authorization: cSesion,
			},
		})
			.then((res) => window.location.reload(true))
			.catch((error) => console.log(error));
	};

	return (
		<>
			{datos &&
				datos.map((usuario, index) => {
					return (
						<FormularioEditarDatosUsuario key={index} onSubmit={handleSubmit(onSubmit)}>
							<FontAwesomeIcon icon={faUserCircle} />
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Nombre: </DatoUsuario>
								<InputEditarUsuario
									autoComplete="off"
									{...register('nombre', {
										value: usuario.nombre_completo,
									})}
								/>
							</ContenedorDatosUsuario>
							{errors.nombre && <ErrorCantidad $usuario>{errors.nombre.message}</ErrorCantidad>}
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Correo: </DatoUsuario>
								<DatoUsuario>{usuario.correo_electronico}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Fecha de Nacimiento: </DatoUsuario>
								<DatoUsuario>{usuario.fecha_nacimiento}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Telefono: </DatoUsuario>
								<InputEditarUsuario
									$telefono
									autoComplete="off"
									{...register('telefono', {
										value: usuario.telefono,
										onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
									})}
								/>
							</ContenedorDatosUsuario>
							{errors.telefono && <ErrorCantidad $usuario>{errors.telefono.message}</ErrorCantidad>}
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Estado: </DatoUsuario>
								<DatoUsuario>{usuario.nombre}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<BotonEditarPerfil
									$cancelar
									type="button"
									onClick={() => cambiarEstadoFormulario(!estadoFormulario)}
								>
									Cancelar
								</BotonEditarPerfil>
								<BotonEditarPerfil type="submit">Actualizar</BotonEditarPerfil>
							</ContenedorDatosUsuario>
						</FormularioEditarDatosUsuario>
					);
				})}
		</>
	);
};

export default FormularioEditarUsuario;
