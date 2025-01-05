import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { ContenedorMain, ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import FormularioAgregarProducto from './FormularioAgregarProducto';
import FormularioAgregarCategoria from './FormularioAgregarCategoria';
import FormularioAgregarCliente from './FormularioAgregarCliente';
import FormularioAgregarUsuario from './FormularioAgregarUsuario';
import Alerta from './Alerta';

const AgregarElementos = () => {
	const { elemento } = useParams();
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});
	// Según lo que deseen agregar les mostrará el respectivo formulario
	return (
		<>
			<Helmet>
				<title>Agregar {elemento && elemento}</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				<ContenedorMain>
					{elemento && elemento === 'producto' && (
						<FormularioAgregarProducto
							cambiarEstadoAlerta={cambiarEstadoAlerta}
							cambiarAlerta={cambiarAlerta}
						/>
					)}
					{elemento && elemento === 'categoria' && (
						<FormularioAgregarCategoria
							cambiarEstadoAlerta={cambiarEstadoAlerta}
							cambiarAlerta={cambiarAlerta}
						/>
					)}
					{elemento && elemento === 'cliente' && (
						<FormularioAgregarCliente
							cambiarEstadoAlerta={cambiarEstadoAlerta}
							cambiarAlerta={cambiarAlerta}
						/>
					)}
					{elemento && elemento === 'usuario' && (
						<FormularioAgregarUsuario
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

export default AgregarElementos;
