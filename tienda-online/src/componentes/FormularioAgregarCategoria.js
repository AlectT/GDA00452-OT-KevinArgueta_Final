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
import esquemaAgregarCategoria from '../esquemas/esquemaAgregarCategoria';
import { ErrorCantidad } from '../elementos/ElementosProductos';

const FormularioAgregarCategoria = ({
	dataActualizar,
	cambiarEstadoAlerta,
	cambiarAlerta,
}) => {
	const { cSesion, idU, rol } = useAuth();
	const navigate = useNavigate();

	// Lógica para evitar que usuarios con rol cliente ingresen a la interfaz de operador
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
		resolver: yupResolver(esquemaAgregarCategoria),
	});

	// Lógica para agregar o actualizar una categoría a través de una petición al API
	const onSubmit = (body) => {
		if (!dataActualizar) {
			body.usuario = idU;
			fetch('http://localhost:4000/agregarCategoria', {
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
							mensaje: 'No se pudo agregar la categoria',
						});
					} else {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'exito',
							mensaje: 'Categoria agregada correctamente',
						});
						reset();
					}
				})
				.catch((error) => console.log(error));
		} else {
			fetch(
				`http://localhost:4000/actualizarCategoria/${dataActualizar[0].idCategoriaProductos}`,
				{
					method: 'PUT',
					body: JSON.stringify(body),
					headers: {
						'Content-type': 'application/json',
						accept: 'application/json',
						Authorization: cSesion,
					},
				},
			)
				.then((res) => {
					if (res.status === 400) {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'error',
							mensaje: 'No se pudo actualizar la categoria',
						});
					} else {
						window.location.reload(true);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<ContenedorFormularioAgregar onSubmit={handleSubmit(onSubmit)} $categoria>
			<ContenedorInputFormulario>
				<DatoSolicitado>
					Nombre de la categoria
					{errors.nombre && <ErrorCantidad $detalle>{errors.nombre.message}</ErrorCantidad>}
				</DatoSolicitado>

				<InputDato
					type="text"
					{...register('nombre', {
						value: dataActualizar ? dataActualizar[0].nombre : '',
					})}
				/>
			</ContenedorInputFormulario>
			<ContenedorBotonFormulario>
				<button type="submit">{!dataActualizar ? 'Agregar' : 'Actualizar'} categoria</button>
			</ContenedorBotonFormulario>
		</ContenedorFormularioAgregar>
	);
};

export default FormularioAgregarCategoria;
