import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useObtenerDatos from '../hooks/useObtenerDatos';
import FormularioAgregarProducto from './FormularioAgregarProducto';
import FormularioAgregarCategoria from './FormularioAgregarCategoria';
import FormularioAgregarCliente from './FormularioAgregarCliente';
import FormularioAgregarUsuario from './FormularioAgregarUsuario';
import { Helmet } from 'react-helmet';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import Alerta from './Alerta';

const ActualizarElementos = () => {
	const { elemento, id } = useParams();
	const navigate = useNavigate('');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});
	let url;
	switch (elemento) {
		case 'producto':
			url = `http://localhost:4000/obtenerProductoID/${id}`;
			break;
		case 'categoria':
			url = `http://localhost:4000/obtenerCategoriaID/${id}`;
			break;
		case 'cliente':
			url = `http://localhost:4000/obtenerClienteID/${id}`;
			break;
		case 'usuario':
			url = `http://localhost:4000/obtenerUsuarioID/${id}`;
			break;
		default:
			navigate('/tienda');
			break;
	}

	const { datos } = useObtenerDatos(url);

	return (
		<>
			<Helmet>
				<title>Actualizar {elemento && elemento}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain>
					{elemento && datos && elemento === 'producto' && (
						<FormularioAgregarProducto
							dataActualizar={datos}
							cambiarAlerta={cambiarAlerta}
							cambiarEstadoAlerta={cambiarEstadoAlerta}
						/>
					)}
					{elemento && datos && elemento === 'categoria' && (
						<FormularioAgregarCategoria
							dataActualizar={datos}
							cambiarAlerta={cambiarAlerta}
							cambiarEstadoAlerta={cambiarEstadoAlerta}
						/>
					)}
					{elemento && datos && elemento === 'cliente' && (
						<FormularioAgregarCliente
							dataActualizar={datos}
							cambiarAlerta={cambiarAlerta}
							cambiarEstadoAlerta={cambiarEstadoAlerta}
						/>
					)}
					{elemento && datos && elemento === 'usuario' && (
						<FormularioAgregarUsuario
							dataActualizar={datos}
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

export default ActualizarElementos;
