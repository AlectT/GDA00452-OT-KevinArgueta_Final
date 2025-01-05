import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextos/contextoSesion';

const RutaPrivada = ({ children }) => {
	const { cSesion } = useAuth();

	// Lógica para proteger las rutas y los links
	// Si el usuario tiene una sesión podrá acceder a los componentes, de lo contrario será redirigido al login
	if (cSesion) {
		return children;
	} else {
		return <Navigate replace to={'/'} />;
	}
};

export default RutaPrivada;
