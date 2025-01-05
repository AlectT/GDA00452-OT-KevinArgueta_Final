import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	ContenedorFormularioAgregar,
	ContenedorInputFormulario,
	DatoSolicitado,
	InputDato,
	ContenedorBotonFormulario,
} from '../elementos/ElementosFormularios';
import { useAuth } from '../contextos/contextoSesion';
import { useNavigate } from 'react-router-dom';
import esquemaAgregarCliente from '../esquemas/esquemaAgregarCliente';
import { ErrorCantidad } from '../elementos/ElementosProductos';

const FormularioAgregarCliente = ({ dataActualizar, cambiarEstadoAlerta, cambiarAlerta }) => {
	const { cSesion, idU, rol } = useAuth();
	const navigate = useNavigate();

	//Lógica para evitar que usuarios con rol cliente ingresen a la interfaz de operador
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
		resolver: yupResolver(esquemaAgregarCliente),
	});

	// Lógica para subit o actualizar un cliente
	const onSubmit = (body) => {
		if (!dataActualizar) {
			body.usuario = idU;
			fetch('http://localhost:4000/agregarCliente', {
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
							mensaje: 'No se pudo agregar el cliente',
						});
					} else {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'exito',
							mensaje: 'Cliente agregado correctamente',
						});
						reset();
					}
				})
				.catch((error) => console.log(error));
		} else {
			fetch(`http://localhost:4000/actualizarCliente/${dataActualizar[0].idClientes}`, {
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
							mensaje: 'No se pudo actualizar el cliente',
						});
					} else {
						window.location.reload(true);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<ContenedorFormularioAgregar onSubmit={handleSubmit(onSubmit)}>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Razón social
					{errors.razonSocial && (
						<ErrorCantidad $detalle>{errors.razonSocial.message}</ErrorCantidad>
					)}
				</DatoSolicitado>
				<InputDato
					type="text"
					{...register('razonSocial', {
						value: dataActualizar ? dataActualizar[0].razon_social : '',
					})}
				/>
			</ContenedorInputFormulario>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Nombre comercial
					{errors.nombreComercial && (
						<ErrorCantidad $detalle>{errors.nombreComercial.message}</ErrorCantidad>
					)}
				</DatoSolicitado>
				<InputDato
					type="text"
					{...register('nombreComercial', {
						value: dataActualizar ? dataActualizar[0].nombre_comercial : '',
					})}
				/>
			</ContenedorInputFormulario>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Teléfono
					{errors.telefono && <ErrorCantidad $detalle>{errors.telefono.message}</ErrorCantidad>}
				</DatoSolicitado>
				<InputDato
					type="text"
					{...register('telefono', {
						value: dataActualizar ? dataActualizar[0].telefono : '',
						onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
					})}
				/>
			</ContenedorInputFormulario>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Correo electrónico
					{errors.email && <ErrorCantidad $detalle>{errors.email.message}</ErrorCantidad>}
				</DatoSolicitado>
				<InputDato
					type="text"
					{...register('email', { value: dataActualizar ? dataActualizar[0].email : '' })}
				/>
			</ContenedorInputFormulario>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Dirección
					{errors.direccion && <ErrorCantidad $detalle>{errors.direccion.message}</ErrorCantidad>}
				</DatoSolicitado>
				<InputDato
					type="text"
					{...register('direccion', {
						value: dataActualizar ? dataActualizar[0].direccion_entrega : '',
					})}
				/>
			</ContenedorInputFormulario>
			<ContenedorBotonFormulario>
				<button type="submit">{!dataActualizar ? 'Agregar' : 'Actualizar'} cliente</button>
			</ContenedorBotonFormulario>
		</ContenedorFormularioAgregar>
	);
};

export default FormularioAgregarCliente;
