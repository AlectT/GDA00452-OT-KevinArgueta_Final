import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ContenedorPagina } from '../elementos/Maquetacion';
import NavBar from './NavBar';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useAuth } from '../contextos/contextoSesion';
import Ordenes from './Ordenes';

const HistorialCarritos = () => {
	const { id } = useParams();
	const { idU } = useAuth();
	const navigate = useNavigate();
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerCarritosUsuario/${id}`);

	// Lógica para evitar que vean historiales de otros usuarios
	// ? Solo los operadores podrán ver todas las ordenes
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
				<title>Historial de compras</title>
			</Helmet>
			<ContenedorPagina>
				<NavBar />
				{/* Reutilización del componente ordenes con los datos del historial */}
				{datos && <Ordenes ordenes={datos} />}
			</ContenedorPagina>
		</>
	);
};

export default HistorialCarritos;
