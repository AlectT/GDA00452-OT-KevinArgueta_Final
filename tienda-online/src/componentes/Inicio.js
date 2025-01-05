import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavBar from './NavBar';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import Tienda from './Tienda';
import { useAuth } from '../contextos/contextoSesion';
import InicioOrdendes from './InicioOrdenes';
import Alerta from './Alerta';

const Inicio = () => {
	const { rol } = useAuth();
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	return (
		<>
			<Helmet>
				<title>Inicio</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain $maquetar="tienda">
					{rol && rol === 'C' && (
						<Tienda cambiarAlerta={cambiarAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta} />
					)}
					{rol && rol === 'O' && <InicioOrdendes />}
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

export default Inicio;
