import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextos/contextoSesion';

const RutaPrivada = ({ children }) => {
	const { cSesion } = useAuth();

	if (cSesion) {
		return children;
	} else {
		return <Navigate replace to={'/'} />;
	}
};

export default RutaPrivada;
