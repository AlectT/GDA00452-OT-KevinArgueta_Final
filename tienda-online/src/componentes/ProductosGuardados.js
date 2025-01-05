import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ContenedorPagina, ContenedorMain } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import Tienda from './Tienda';
import { useAuth } from '../contextos/contextoSesion';
import Alerta from './Alerta';

const ProductosGuardados = () => {
	const productosGuardados = localStorage.getItem('productos')
		? JSON.parse(localStorage.getItem('productos'))
		: [];
	const [verMasTarde, cambiarVerMasTarde] = useState(productosGuardados);
	const { idU } = useAuth();
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	useEffect(() => {
		cambiarVerMasTarde(
			verMasTarde.filter((elemento) => {
				if (elemento[1] === Number(idU)) {
					return elemento; //
				}
				return false;
			}),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idU]);

	return (
		<>
			<Helmet>
				<title>Productos guardados</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain $maquetar="tienda">
					{verMasTarde && verMasTarde !== null && (
						<Tienda
							productosGuardadosUsuario={verMasTarde}
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

export default ProductosGuardados;
