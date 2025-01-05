import React from 'react';
import {
	BotonPerfil,
	CerrarMenu,
	ContenedorIcono,
	ContenedorListaMenu,
	ContenedorMenu,
	FondoOpaco,
	ListaMenu,
} from '../elementos/ElementosMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCircle,
	faArrowRight,
	faXmark,
	faSignOut,
	faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useAuth } from '../contextos/contextoSesion';
import OpcionesMenuCliente from './OpcionesMenuCliente';
import OpcionesMenuOperador from './OpcionesMenuOperador';

const MenuSesion = ({ menuActivo, cambiarMenuActivo }) => {
	const { rol, idU, cambiarRol, cambiarIdU, cambiarCSesion } = useAuth();

	const { datos } = useObtenerDatos('http://localhost:4000/obtenerCategorias');

	const cerrarSesion = () => {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		});
		cambiarRol(null);
		cambiarIdU(null);
		cambiarCSesion(null);
	};

	return (
		<>
			<CerrarMenu $menuActivo={menuActivo} onClick={() => cambiarMenuActivo(!menuActivo)}>
				<FontAwesomeIcon icon={faXmark} />
			</CerrarMenu>
			<ContenedorMenu $menuActivo={menuActivo}>
				<ContenedorIcono>
					<FontAwesomeIcon icon={faUserCircle} />
					<BotonPerfil href={`/tienda/perfil/${idU}`}>Ver Perfil</BotonPerfil>
				</ContenedorIcono>
				<ContenedorListaMenu>
					{rol && rol === 'C' && datos && <OpcionesMenuCliente categorias={datos} />}

					{rol && rol === 'C' && (
						<ListaMenu $historial>
							<a href={`/tienda/historialCompras/${idU}`}>Ver historial de compras</a>{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</ListaMenu>
					)}
					{rol && rol === 'C' && (
						<ListaMenu>
							<a href={`/tienda/productosGuardados`}>Ver productos guardados</a>{' '}
							<FontAwesomeIcon icon={faBookmark} />
						</ListaMenu>
					)}
					{rol && rol === 'O' && <OpcionesMenuOperador rol={rol} />}
					<ListaMenu onClick={() => cerrarSesion()}>
						<button type="button">Cerrar Sesión</button>
						<FontAwesomeIcon icon={faSignOut} />
					</ListaMenu>
				</ContenedorListaMenu>
			</ContenedorMenu>
			{menuActivo && (
				<FondoOpaco $menuActivo={menuActivo} onClick={() => cambiarMenuActivo(!menuActivo)} />
			)}
		</>
	);
};

export default MenuSesion;
