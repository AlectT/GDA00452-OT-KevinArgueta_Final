import React from 'react';
import { ContenedorGlobal } from '../elementos/Maquetacion';
import { Helmet } from 'react-helmet';
import { NoProductos } from '../elementos/ElementosInicioTienda';

const Error404 = () => {
	return (
		<>
			<Helmet>
				<title>Error 404</title>
			</Helmet>
			<ContenedorGlobal>
				<NoProductos>Página no encontrada</NoProductos>
			</ContenedorGlobal>
		</>
	);
};

export default Error404;
