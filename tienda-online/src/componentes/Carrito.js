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
							{datos[0].total_orden !== 0 && datos[0].nombreEstado === 'Orden en proceso' && (
								<button onClick={() => limpiarCarrito()}>
									limpiar carrito <FontAwesomeIcon icon={faWarning} />
								</button>
							)}
						</Encabezado>
						{datos[0].total_orden !== 0 ? (
							datos.map((producto, index) => {
								return (
									<ProductoCarrito key={index}>
										<ContenedorDetallesCarrito>
											<DetallesCarrito $nombre>{producto.nombreProducto}</DetallesCarrito>
											<DetallesCarrito $marca>{producto.marca}</DetallesCarrito>
										</ContenedorDetallesCarrito>
										<EditarCantidadDetalle producto={producto} cSesion={cSesion} />
										<ImagenCarrito>
											<img src={logo} alt="logo" />
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
