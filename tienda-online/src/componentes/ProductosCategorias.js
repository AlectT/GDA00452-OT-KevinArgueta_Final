import React, { useEffect, useState } from 'react';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import { Helmet } from 'react-helmet';
import NavBar from './NavBar';
import Tienda from './Tienda';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useNavigate, useParams } from 'react-router-dom';
import Alerta from './Alerta';

const ProductosCategorias = () => {
	const { nombre } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/buscarProductosCategoria/${nombre}`);
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		if (datos) {
			if (datos[0] && datos[0].estadoCategoria === 4) {
				navigate('/tienda');
			}
		}
	}, [datos, navigate]);

	return (
		<>
			<Helmet>
				<title>Productos de {nombre && nombre}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain $maquetar="tienda">
					{/* Reutilización del componente tienda para los productos por categorías */}
					{datos && datos !== null && (
						<Tienda
							productos={datos}
							cambiarEstadoAlerta={cambiarEstadoAlerta}
							cambiarAlerta={cambiarAlerta}
						/>
					)}
				</ContenedorMain>

				<Alerta
					color={alerta.color}
					mensaje={alerta.mensaje}
					estadoAlerta={estadoAlerta}
					cambiarEstadoAlerta={cambiarEstadoAlerta}
				/>
			</ContenedorPagina>
		</>
	);
};

export default ProductosCategorias;
