import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import useObtenerDatos from '../hooks/useObtenerDatos';
import DatosUsuario from './DatosUsuario';
import FormularioEditarUsuario from './FormularioEditarUsuario';
import { useAuth } from '../contextos/contextoSesion';

const Perfil = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { idU } = useAuth();
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerUsuarioID/${id}`);
	const [estadoFormulario, cambiarEstadoFormulario] = useState();

	useEffect(() => {
		if (datos) {
			if (datos.length === 0 || datos[0].idUsuarios !== Number(idU)) {
				navigate('/tienda');
			}
		}
	}, [datos, navigate, idU]);

	return (
		<>
			<Helmet>
				<title>Perfil</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain>
					{datos && datos[0] && !estadoFormulario && (
						<DatosUsuario
							datos={datos}
							estadoFormulario={estadoFormulario}
							cambiarEstadoFormulario={cambiarEstadoFormulario}
						/>
					)}
					{datos && datos[0] && estadoFormulario && (
						<FormularioEditarUsuario
							datos={datos}
							estadoFormulario={estadoFormulario}
							cambiarEstadoFormulario={cambiarEstadoFormulario}
						/>
					)}
				</ContenedorMain>
			</ContenedorPagina>
		</>
	);
};

export default Perfil;
