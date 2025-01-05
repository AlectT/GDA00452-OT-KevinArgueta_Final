import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContenedorBuscarProducto } from '../elementos/ElementosNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import esquemaBuscarProducto from '../esquemas/esquemaBuscarProducto';
import { useNavigate } from 'react-router-dom';

const FormularioBuscarProducto = ({ busquedaActiva, cambiarBusquedaActiva }) => {
	const navigate = useNavigate('');
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(esquemaBuscarProducto),
	});

	const onSubmit = (body) => {
		navigate(`/tienda/productos/${body.producto}`);
	};

	return (
		<ContenedorBuscarProducto method="POST" onSubmit={handleSubmit(onSubmit)}>
			<input type="text" {...register('producto')} />
			<button type="submit">
				<FontAwesomeIcon icon={faSearch} />
			</button>
			<button onClick={() => cambiarBusquedaActiva(!busquedaActiva)}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</ContenedorBuscarProducto>
	);
};

export default FormularioBuscarProducto;
