import React, { useState } from 'react';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import { Helmet } from 'react-helmet';
import NavBar from './NavBar';
import Tienda from './Tienda';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useParams } from 'react-router-dom';
import Alerta from './Alerta';

const ProductosCategorias = () => {
	const { nombre } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/buscarProductosCategoria/${nombre}`);
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	return (
		<>
			<Helmet>
				<title>Productos de {nombre && nombre}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain $maquetar="tienda">
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
