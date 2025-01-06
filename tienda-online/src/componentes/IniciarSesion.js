import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	ContenedorFormulario,
	ContenedorLabel,
	Label,
	InputText,
	Span,
	SpanError,
	LogoFormulario,
	ContenedorInput,
	BotonFormulario,
} from '../elementos/ElementosFormularioInicioSesion';
import Password from './Password';
import Alerta from './Alerta';
import MTO from '../imagenes/MTO.png';
import esquemaSesion from '../esquemas/esquemaSesion';
import { ContextoSesion } from '../contextos/contextoSesion';
import { fechaSiguiente } from '../hooks/fechas';

const IniciarSesion = () => {
	// Estado para mostrar u ocultar la contraseña
	const [tipoPassword, cambiarTipoPassword] = useState('password');
	const navigate = useNavigate();
	const { cSesion, cambiarCSesion, rol, cambiarRol, idU, cambiarIdU } =
		useContext(ContextoSesion);
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	// Funciones para el manejo de formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(esquemaSesion),
	});

	// Logica para iniciar sesion a través de una petición al API
	const onSubmit = (body) => {
		fetch('http://localhost:4000/iniciarSesion', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'error') {
					cambiarEstadoAlerta(true);
					cambiarAlerta({
						color: 'error',
						mensaje: 'Datos incorrectos',
					});
				} else {
					cambiarCSesion(data.token);
					cambiarRol(data.rol);
					cambiarIdU(data.idU);
				}
			})
			.catch((error) => console.log(error));
	};

	// Agregar contexto al inciar sesión
	useEffect(() => {
		if (cSesion === null || cSesion === undefined) {
			return;
		}

		if (cSesion.status === 'error') {
			alert('datos incorrectos');
			return;
		}

		if (cSesion) {
			const fechaExpiracion = fechaSiguiente(new Date());
			document.cookie = `token=${cSesion}; expires=${fechaExpiracion};`;
			document.cookie = `idU=${idU}; expires=${fechaExpiracion};`;
			document.cookie = `rol=${rol}; expires=${fechaExpiracion};`;
			navigate('/tienda');
		}
	}, [cSesion, navigate, rol, idU]);

	// Limpiar cookies y contexto al cerrar sesión
	useEffect(() => {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString());
		});
		cambiarRol(null);
		cambiarIdU(null);
		cambiarCSesion(null);
	}, [cambiarRol, cambiarIdU, cambiarCSesion]);

	return (
		<>
			<Helmet>
				<title> Iniciar Sesión </title>
			</Helmet>
			<ContenedorFormulario method="POST" onSubmit={handleSubmit(onSubmit)}>
				<LogoFormulario>
					<img src={MTO} alt="logo" />
				</LogoFormulario>
				<ContenedorLabel>
					<Label>
						<Span>Usuario:</Span>
						<ContenedorInput $error={errors.correo ? true : false}>
							<InputText type="text" autoComplete="off" {...register('correo')} />
						</ContenedorInput>
					</Label>
					{errors.correo && <SpanError>{errors.correo.message}</SpanError>}
				</ContenedorLabel>
				<ContenedorLabel>
					<Label>
						<Span>Contraseña:</Span>
						<ContenedorInput $error={errors.password ? true : false}>
							<InputText type={tipoPassword} autoComplete="off" {...register('password')} />
							<Password tipoPassword={tipoPassword} cambiarTipoPassword={cambiarTipoPassword} />
						</ContenedorInput>
					</Label>
					{errors.password && <SpanError>{errors.password.message}</SpanError>}
				</ContenedorLabel>
				<BotonFormulario type="submit">Ingresar</BotonFormulario>
			</ContenedorFormulario>
			<Alerta
				color={alerta.color}
				mensaje={alerta.mensaje}
				estadoAlerta={estadoAlerta}
				cambiarEstadoAlerta={cambiarEstadoAlerta}
			/>
		</>
	);
};

export default IniciarSesion;
