import * as yup from 'yup';

const esquemaEditarUsuario = yup.object().shape({
	nombre: yup.string().min(15, 'Ingrese su nombre completo').required('Ingrese su nombre'),
	telefono: yup
		.string('Solo puede ingresar números')
		.min(8, 'Ingrese un número válido')
		.max(8, 'Ingrese un número válido')
		.required('Ingrese su numero de telefono'),
});

export default esquemaEditarUsuario;
