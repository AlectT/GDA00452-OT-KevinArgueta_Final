import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import {
	ContenedorImgProducto,
	ContenedorDatosProducto,
	AgruparDetalles,
	DatosProducto,
	BotonAgregar,
	ContenedorCantidad,
	ErrorCantidad,
	ProductoAgotado,
} from '../elementos/ElementosProductos';
import logo from '../imagenes/logoPeque.png';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCartPlus,
	faMinus,
	faPlus,
	faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import useObtenerDatos from '../hooks/useObtenerDatos';
import formatearCantidad from '../hooks/ConvertirMoneda';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contextos/contextoSesion';
import useObtenerCarritoActual from '../hooks/useObtenerCarritoActual';

const DetallesProductos = () => {
	const navigate = useNavigate();
	// Estado para poder interactuar con la cantidad a traves de los botoens + y  -
	const [cantidad, cambiarCantidad] = useState(1);
	// Estado para saber si este producto ya se encuentra en el carrito actual del usuario
	const [estaEnCarrito, cambiarEstaEnCarrito] = useState();
	const { id } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerProductoID/${id}`);
	const { cSesion, idU } = useAuth();
	const carritoActual = useObtenerCarritoActual(
		`http://localhost:4000/obtenerCarritoActual/${idU}`,
	);

	// Si el stock del producto es 0 entonces la cantidad del input también
	useEffect(() => {
		if (datos && datos[0].stock === 0) {
			cambiarCantidad(0);
		}
	}, [datos]);

	// Determinar si el producto se encuentra en el carrito
	useEffect(() => {
		if (carritoActual && carritoActual !== null) {
			const test = carritoActual.find((producto) => {
				if (producto.idProductos === parseInt(id)) {
					return true;
				} else {
					return false;
				}
			});
			cambiarEstaEnCarrito(test);
		}
	}, [carritoActual, id]);

	// Esquema para la cantidad de productos
	// No lo pude poner en la carpeta de esquemas debido a que necesitaba el stock actual del producto para la validación
	const esquemaComprarProducto = yup.object().shape({
		cantidad: yup
			.number()
			.min(1, 'La cantidad debe ser al menos de 1')
			.max(datos && datos[0].stock, 'La cantidad es mayor al stock')
			.required('Ingrese la cantidad que desea comprar'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(esquemaComprarProducto),
	});

	// Lógica para agregar el producto al carrito a traves de una petición al API
	const onSubmit = (body) => {
		body.cantidad = cantidad;
		body.orden = carritoActual[0].idOrden;
		body.producto = datos[0].idProductos;

		fetch('http://localhost:4000/agregarDetalles', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				authorization: cSesion,
				'Content-type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((res) => {
				window.location.reload(true);
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Helmet>
				<title>Producto</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				{datos !== null &&
					datos.map((producto, index) => {
						// Lógica para transformar la foto de base64 a imagen y luego a un url
						let url;
						if (producto.foto !== null) {
							const byteFoto = atob(producto.foto);
							const sizeFoto = byteFoto.length;
							const bytesImagen = new Uint8Array(sizeFoto);
							for (let i = 0; i < sizeFoto; i++) {
								bytesImagen[i] = byteFoto.charCodeAt(i);
							}

							const blob = new Blob([bytesImagen], { type: 'image/png' });
							url = URL.createObjectURL(blob);
						}

						return (
							<ContenedorMain $maquetar="producto" key={index}>
								<ContenedorImgProducto>
									{url ? (
										<img src={url} alt="Imagen del producto" />
									) : (
										<img src={logo} alt="Imagen del producto" />
									)}
								</ContenedorImgProducto>
								<ContenedorDatosProducto method="POST" onSubmit={handleSubmit(onSubmit)}>
									<AgruparDetalles>
										<DatosProducto $nombre>{producto.nombre}</DatosProducto>
										<DatosProducto $marca>{producto.marca}</DatosProducto>
									</AgruparDetalles>
									<DatosProducto $precio>{formatearCantidad(producto.precio)}</DatosProducto>
									<AgruparDetalles>
										<DatosProducto>Unidades disponibles: {producto.stock}</DatosProducto>
										<ContenedorCantidad>
											<DatosProducto $cantidad>Cantidad</DatosProducto>
											<div>
												<FontAwesomeIcon
													icon={faPlus}
													onClick={() => {
														if (Number(cantidad) < producto.stock) {
															cambiarCantidad(Number(cantidad) + 1);
														}
													}}
												/>
												{producto.stock > 0 ? (
													<input
														type="text"
														value={cantidad}
														autoComplete="off"
														{...register('cantidad', {
															onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
														})}
														onChange={(e) => {
															const cantidadInput = Number(e.target.value.replace(/[^0-9]/g, ''));
															if (cantidadInput <= producto.stock) {
																cambiarCantidad(cantidadInput);
															}
														}}
													/>
												) : (
													<input
														type="text"
														autoComplete="off"
														readOnly
														{...register('cantidad', {
															value: cantidad,
															onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, '')),
														})}
													/>
												)}
												<FontAwesomeIcon
													icon={faMinus}
													onClick={() => {
														if (Number(cantidad) > 1) {
															cambiarCantidad(Number(cantidad) - 1);
														}
													}}
												/>
											</div>
										</ContenedorCantidad>
									</AgruparDetalles>
									{producto.stock === 0 && <ProductoAgotado>Producto agotado!</ProductoAgotado>}
									{producto.idEstados === 2 && (
										<ProductoAgotado>Producto no disponible!</ProductoAgotado>
									)}
									{errors.cantidad && <ErrorCantidad>{errors.cantidad.message}</ErrorCantidad>}
									{!estaEnCarrito && producto.stock > 0 && producto.idEstados !== 2 && (
										<BotonAgregar type="submit">
											<span>agregar al carrito</span>
											<FontAwesomeIcon icon={faCartPlus} />
										</BotonAgregar>
									)}
									{estaEnCarrito && (
										<BotonAgregar
											$estaEnCarrito
											type="button"
											onClick={() => navigate(`/tienda/carrito/${carritoActual[0].idOrden}`)}
										>
											<span>Editar carrito</span>
											<FontAwesomeIcon icon={faShoppingCart} />
										</BotonAgregar>
									)}
								</ContenedorDatosProducto>
							</ContenedorMain>
						);
					})}
			</ContenedorPagina>
		</>
	);
};

export default DetallesProductos;
