import React, { useState } from 'react';
import {
	Nav,
	Logo,
	IconosNav,
	GrupoIconos,
	LinkInicio,
	ContenedorElementosNav,
	IconoCarrito,
} from '../elementos/ElementosNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import VGT from '../imagenes/VGT.png';
import MenuSesion from './MenuSesion';
import { useAuth } from '../contextos/contextoSesion';
import useObtenerCarritoActual from '../hooks/useObtenerCarritoActual';
import FormularioBuscarProducto from './FormularioBuscarProducto';

const NavBar = () => {
	const [menuActivo, cambiarMenuActivo] = useState(false);
	const [busquedaActiva, cambiarBusquedaActiva] = useState(false);
	const { idU, rol } = useAuth();
	const carritoActual = useObtenerCarritoActual(
		`http://localhost:4000/obtenerCarritoActual/${idU}`,
	);

	return (
		<>
			<Nav>
				<MenuSesion menuActivo={menuActivo} cambiarMenuActivo={cambiarMenuActivo} />
				<ContenedorElementosNav>
					<IconosNav $icono="menu" onClick={() => cambiarMenuActivo(!menuActivo)}>
						<FontAwesomeIcon icon={faBars} />
					</IconosNav>
					<LinkInicio href="/tienda">
						<Logo src={VGT} alt="logo" />
					</LinkInicio>
					{rol && rol === 'C' && (
						<GrupoIconos>
							{carritoActual && (
								<IconoCarrito
									href={`/tienda/carrito/${carritoActual[0].idOrden}`}
									$buscar={busquedaActiva ? true : false}
								>
									<FontAwesomeIcon icon={faShoppingCart} />
								</IconoCarrito>
							)}
							{!busquedaActiva ? (
								<IconosNav onClick={() => cambiarBusquedaActiva(!busquedaActiva)}>
									<FontAwesomeIcon icon={faSearch} />
								</IconosNav>
							) : (
								<FormularioBuscarProducto
									busquedaActiva={busquedaActiva}
									cambiarBusquedaActiva={cambiarBusquedaActiva}
								/>
							)}
						</GrupoIconos>
					)}
				</ContenedorElementosNav>
			</Nav>
		</>
	);
};

export default NavBar;
