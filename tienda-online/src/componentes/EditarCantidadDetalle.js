import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import formatearCantidad from '../hooks/ConvertirMoneda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckSquare,
	faEdit,
	faTrash,
	faXmarkSquare,
} from '@fortawesome/free-solid-svg-icons';
import {
	ContenedorDetallesCarrito,
	DetallesCarrito,
	BotonAccion,
	InputEditarCantidad,
	FormularioEditarCantidad,
} from '../elementos/ElementosCarrito';
import { ErrorCantidad } from '../elementos/ElementosProductos';

const EditarCantidadDetalle = ({ producto, cSesion }) => {
	const [editarCantidad, cambiarEditarCantidad] = useState(false);
	const eliminarDetalle = (idOrdenDetalles) => {
		fetch(`http://localhost:4000/eliminarOrdenDetalles/${idOrdenDetalles}`, {
			method: 'DELETE',
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

	const esquemaCantidad = yup.object().shape({
		cantidad: yup
			.string('La cantidad debe de ser un numero')
			.min(1, 'La cantidad no puede ser menor a 1')
			.test('cantidad', 'Cantidad inválida', (cantidad) => {
				if (cantidad) {
					if (cantidad === 0) {
						return false;
					}
					if (cantidad > producto.cantidad) {
						const cantidadNueva = cantidad - producto.cantidad;
						if (cantidadNueva > producto.stock) {
							return false;
						} else {
							return true;
						}
					} else {
						return true;
					}
				} else {
					return false;
				}
			})
			.required('Ingrese la cantidad de productos deseada'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(esquemaCantidad),
	});

	const onSubmit = (body) => {
		fetch(`http://localhost:4000/actualizarDetalles/${producto.idOrdenDetalles}`, {
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
		<FormularioEditarCantidad method="PUT" onSubmit={handleSubmit(onSubmit)}>
			<ContenedorDetallesCarrito $formulario>
				{!editarCantidad && (
					<DetallesCarrito>
						<span>Cantidad:</span> <span>{producto.cantidad}</span>
					</DetallesCarrito>
				)}
				{editarCantidad && (
					<DetallesCarrito $error>
						<span>Cantidad:</span>
						<InputEditarCantidad
							type="text"
							autoComplete="off"
							{...register('cantidad', {
								value: producto.cantidad,
								onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
							})}
						/>
						{errors.cantidad && <ErrorCantidad $detalle>{errors.cantidad.message}</ErrorCantidad>}
					</DetallesCarrito>
				)}
				<DetallesCarrito>
					<span>Precio:</span> <span>{formatearCantidad(producto.precio)}</span>
				</DetallesCarrito>
				<DetallesCarrito>
					<span>Subtotal:</span> <span>{formatearCantidad(producto.subtotal)}</span>
				</DetallesCarrito>
			</ContenedorDetallesCarrito>
			<ContenedorDetallesCarrito $formulario $botones>
				{!editarCantidad && producto.nombreEstado === 'Orden en proceso' && (
					<>
						<BotonAccion
							type="button"
							onClick={() => {
								cambiarEditarCantidad(!editarCantidad);
							}}
						>
							<FontAwesomeIcon icon={faEdit} />
						</BotonAccion>
						<BotonAccion
							$eliminar
							type="button"
							onClick={() => eliminarDetalle(producto.idOrdenDetalles)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</BotonAccion>
					</>
				)}
				{editarCantidad && producto.nombreEstado === 'Orden en proceso' && (
					<>
						<BotonAccion $actualizar type="submit">
							<FontAwesomeIcon icon={faCheckSquare} />
						</BotonAccion>
						<BotonAccion
							$eliminar
							type="button"
							onClick={() => cambiarEditarCantidad(!editarCantidad)}
						>
							<FontAwesomeIcon icon={faXmarkSquare} />
						</BotonAccion>
					</>
				)}
			</ContenedorDetallesCarrito>
		</FormularioEditarCantidad>
	);
};

export default EditarCantidadDetalle;
