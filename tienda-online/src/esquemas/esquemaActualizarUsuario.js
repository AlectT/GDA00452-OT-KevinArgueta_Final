import * as yup from 'yup';

const esquemaActualizarUsuario = yup.object().shape({
	nombre: yup.string().required('Ingrese un correo'),
	telefono: yup
		.string()
		.min(8, 'Número de teléfono inválido')
		.max(8, 'Número de teléfono inválido')
		.required('Ingrese un número de teléfono'),
});

export default esquemaActualizarUsuario;
