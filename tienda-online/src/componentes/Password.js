import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IconoInput } from '../elementos/ElementosFormularioInicioSesion';

const Password = ({ tipoPassword, cambiarTipoPassword }) => {
	// Estado para mostrar el icono según el tipo de input
	const [iconoOjo, cambiarIconoOjo] = useState(faEye);

	//Cambiar el ícono junto con el tipo de input
	useEffect(() => {
		if (tipoPassword === 'password') {
			cambiarIconoOjo(faEye);
		} else {
			cambiarIconoOjo(faEyeSlash);
		}
	}, [tipoPassword]);

	// Cambiar tipo de input de contraseña
	const showHide = () => {
		if (tipoPassword === 'password') {
			cambiarTipoPassword('text');
		} else {
			cambiarTipoPassword('password');
		}
	};
	return (
		<IconoInput onClick={() => showHide()}>
			<FontAwesomeIcon icon={iconoOjo} />
		</IconoInput>
	);
};

export default Password;
