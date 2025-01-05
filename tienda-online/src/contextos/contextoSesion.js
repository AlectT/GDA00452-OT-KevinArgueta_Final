import React, { useState, useContext, useEffect } from 'react';

const ContextoSesion = React.createContext();

const useAuth = () => {
	return useContext(ContextoSesion);
};

const ProveedorSesion = ({ children }) => {
	const [cSesion, cambiarCSesion] = useState();
	const [rol, cambiarRol] = useState();
	const [idU, cambiarIdU] = useState();
	const [cargando, cambiarCargando] = useState(true);

	useEffect(() => {
		const cookies = document.cookie.split(';');
		cookies.forEach((cookie) => {
			const propiedad = cookie.split('=')[0];
			if (propiedad === ' rol' || propiedad === 'rol') {
				cambiarRol(cookie.split('=')[1]);
			}
			if (propiedad === ' token' || propiedad === 'token') {
				cambiarCSesion(cookie.split('=')[1]);
			}
			if (propiedad === ' idU' || propiedad === 'idU') {
				cambiarIdU(cookie.split('=')[1]);
			}
		});
		cambiarCargando(false);
	}, []);

	return (
		<ContextoSesion.Provider
			value={{
				cSesion,
				cambiarCSesion,
				rol,
				cambiarRol,
				idU,
				cambiarIdU,
			}}
		>
			{!cargando && children}
		</ContextoSesion.Provider>
	);
};

export { ContextoSesion, ProveedorSesion, useAuth };
