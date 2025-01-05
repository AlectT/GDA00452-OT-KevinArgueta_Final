import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	ContenedorCarrito,
	CarritoVacio,
	ContenedorDetallesCarrito,
	DetallesCarrito,
	ImagenCarrito,
	ProductoCarrito,
	Encabezado,
} from '../elementos/ElementosCarrito';
import logo from '../imagenes/logoPeque.png';
import formatearCantidad from '../hooks/ConvertirMoneda';
import useObtenerDatos from '../hooks/useObtenerDatos';
import NavBar from './NavBar';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contextos/contextoSesion';
import EditarCantidadDetalle from './EditarCantidadDetalle';

const Carrito = () => {
	const { id } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerCarrito/${id}`);
	const { cSesion, idU, rol } = useAuth();
	const navigate = useNavigate();

	// Lógica para limpiar el carrito con una petición al API
	const limpiarCarrito = () => {
		if (cSesion) {
			fetch(`http://localhost:4000/limpiarCarrito/${datos[0].idOrden}`, {
				method: 'PUT',
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
		}
	};

	// Lógica para evitar que puedan ver carritos de otras personas
	// ? Solo los operadores podrán ver todos los carritos, pero no modificar los datos
	useEffect(() => {
		if (datos && rol) {
			if (rol !== 'O') {
				if (datos.length === 0 || datos[0].idUsuarios !== Number(idU)) {
					navigate('/tienda');
				}
			}
		}
	}, [datos, idU, navigate, rol]);

	return (
		<ContenedorPagina>
			<NavBar />
			<ContenedorMain>
				{datos !== null && datos[0] && (
					<ContenedorCarrito>
						<Encabezado $titulo>
							<div>Tu carrito</div>
							{/* Si el carrito está vacío no mostrará el botón de limpiar carrito o si el carrito ya no tiene estado en proceso */}
							{datos[0].total_orden !== 0 && datos[0].nombreEstado === 'Orden en proceso' && (
								<button onClick={() => limpiarCarrito()}>
									limpiar carrito <FontAwesomeIcon icon={faWarning} />
								</button>
							)}
						</Encabezado>
						{datos[0].total_orden !== 0 ? (
							datos.map((producto, index) => {
								// Creación de transformar la iamgen de base64 a img y luego a url
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
									<ProductoCarrito key={index}>
										<ContenedorDetallesCarrito>
											<DetallesCarrito $nombre>{producto.nombreProducto}</DetallesCarrito>
											<DetallesCarrito $marca>{producto.marca}</DetallesCarrito>
										</ContenedorDetallesCarrito>
										<EditarCantidadDetalle producto={producto} cSesion={cSesion} />
										<ImagenCarrito>
											{url ? (
												<img src={url} alt="Imagen del producto" />
											) : (
												<img src={logo} alt="Imagen del producto" />
											)}
										</ImagenCarrito>
									</ProductoCarrito>
								);
							})
						) : (
							<CarritoVacio>Carrito vacio</CarritoVacio>
						)}
						<Encabezado $total>
							<div>
								Total: <span>{formatearCantidad(datos[0].total_orden)}</span>
							</div>
							{/* Si el carrito está vacío no mostrará la opción para comprar el carrito al igual que si el estado no es en proceso */}
							{datos[0].total_orden !== 0 && datos[0].nombreEstado === 'Orden en proceso' && (
								<a href={`/tienda/carrito/comprar/${datos[0].idOrden}`}>
									comprar <FontAwesomeIcon icon={faCartArrowDown} />
								</a>
							)}
						</Encabezado>
					</ContenedorCarrito>
				)}
			</ContenedorMain>
		</ContenedorPagina>
	);
};

export default Carrito;
