import React, { useEffect, useState } from 'react';
import {
	BotonDetalles,
	BotonVerMasTarde,
	ContenedorBotonesProductos,
	ContenedorDetallesProductos,
	ContenedorImagen,
	ContenedorProducto,
	ContenedorProductos,
	EtiquetaAgotado,
	EtiquetaNoDisponible,
	EtiquetaNuevo,
	EtiquetaPocasUnidades,
	ImagenProducto,
	NombreProducto,
	NoProductos,
	PrecioProducto,
} from '../elementos/ElementosInicioTienda';
import formatearCantidad from '../hooks/ConvertirMoneda';
import logo from '../imagenes/logoGrande.png';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { diferenciaFecha } from '../hooks/fechas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contextos/contextoSesion';

const Tienda = ({
	productos,
	productosGuardadosUsuario,
	cambiarEstadoAlerta,
	cambiarAlerta,
}) => {
	const { idU } = useAuth();
	const { datos } = useObtenerDatos('http://localhost:4000/obtenerProductos');
	const [listaProductos, cambiarListaProductos] = useState(null);
	const productosGuardados = localStorage.getItem('productos')
		? JSON.parse(localStorage.getItem('productos'))
		: [];
	const [verMasTarde, cambiarVerMasTarde] = useState(productosGuardados);

	useEffect(() => {
		localStorage.setItem('productos', JSON.stringify(verMasTarde));
	}, [verMasTarde]);

	useEffect(() => {
		if (productos) {
			return cambiarListaProductos(productos.reverse());
		}

		if (productosGuardadosUsuario && datos) {
			const productosFiltrados = [];
			productosGuardadosUsuario.forEach((produ) => {
				datos.forEach((dat) => {
					if (dat.idProductos === produ[0]) {
						productosFiltrados.push(dat);
					}
				});
			});
			return cambiarListaProductos(productosFiltrados);
		}

		if (datos) {
			return cambiarListaProductos(datos.reverse());
		}
	}, [datos, productos, productosGuardadosUsuario]);

	const guardarProducto = (producto) => {
		const elementoGuardado = verMasTarde.find((elemento) => {
			if (elemento[0] === producto) {
				return true;
			} else {
				return false;
			}
		});
		if (elementoGuardado && elementoGuardado.length > 0) {
			cambiarVerMasTarde(
				verMasTarde.filter((elemento) => {
					if (elemento[0] !== producto) {
						return elemento; //
					}
					return false;
				}),
			);
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				color: 'exito',
				mensaje: 'Producto removido de ver más tarde',
			});
			productosGuardadosUsuario && window.location.reload(true);
		} else {
			cambiarVerMasTarde([...verMasTarde, [producto, Number(idU)]]);
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				color: 'exito',
				mensaje: 'Producto guardado en ver más tarde',
			});
		}
	};

	return (
		<ContenedorProductos>
			{listaProductos !== null &&
				listaProductos.map((producto, index) => {
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

					const elementoGuardado = verMasTarde.find((elemento) => {
						if (elemento[0] === producto.idProductos && elemento[1] === Number(idU)) {
							return true;
						} else {
							return false;
						}
					});

					return (
						<ContenedorProducto key={index}>
							{producto.stock < 10 && producto.idEstados !== 2 && <EtiquetaPocasUnidades />}
							{producto.stock === 0 && <EtiquetaAgotado />}
							{diferenciaFecha(producto.fecha_creacion) < 3 &&
								producto.idEstados !== 2 &&
								producto.stock !== 0 && <EtiquetaNuevo />}
							{producto.stock === 0 && <EtiquetaAgotado />}
							{diferenciaFecha(producto.fecha_creacion) < 3 &&
								producto.stock !== 0 &&
								producto.idEstados !== 1 && <EtiquetaNuevo />}
							{producto.idEstados === 2 && <EtiquetaNoDisponible />}
							<ContenedorImagen>
								{url ? (
									<ImagenProducto src={url} alt="Imagen del producto" />
								) : (
									<ImagenProducto src={logo} alt="Imagen del producto" />
								)}
							</ContenedorImagen>
							<ContenedorDetallesProductos>
								<NombreProducto>{producto.nombre}</NombreProducto>
								<PrecioProducto>{formatearCantidad(producto.precio)}</PrecioProducto>
								<ContenedorBotonesProductos>
									<BotonDetalles href={`/tienda/producto/${producto.idProductos}`}>
										<span>ver detalles</span>
									</BotonDetalles>
									<BotonVerMasTarde
										onClick={() => guardarProducto(producto.idProductos)}
										$guardado={elementoGuardado && elementoGuardado.length > 0 ? true : false}
									>
										<FontAwesomeIcon icon={faBookmark} />
									</BotonVerMasTarde>
								</ContenedorBotonesProductos>
							</ContenedorDetallesProductos>
						</ContenedorProducto>
					);
				})}
			{listaProductos !== null && listaProductos.length === 0 && (
				<NoProductos>No encontramos lo que buscas</NoProductos>
			)}
		</ContenedorProductos>
	);
};

export default Tienda;
