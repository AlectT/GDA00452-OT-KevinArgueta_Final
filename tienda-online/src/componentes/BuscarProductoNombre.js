import React, { useState } from 'react';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import { Helmet } from 'react-helmet';
import NavBar from './NavBar';
import Tienda from './Tienda';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useParams } from 'react-router-dom';
import Alerta from './Alerta';

const BuscarProductoNombre = () => {
	const { nombre } = useParams();
	const { datos } = useObtenerDatos(`http://localhost:4000/buscarProductoNombre/${nombre}`);
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	// Mostrar las coincidencias del nombre buscado
	return (
		<>
			<Helmet>
				<title>Buscar {nombre && nombre}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain $maquetar="tienda">
					{/* Reutilización del componente de Tienda para mostrar los productos */}
					{datos && datos !== null && (
						<Tienda
							productos={datos}
							cambiarAlerta={cambiarAlerta}
							cambiarEstadoAlerta={cambiarEstadoAlerta}
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

export default BuscarProductoNombre;
