import * as yup from 'yup';

const esquemaSesion = yup.object().shape({
	correo: yup.string().email('Correo inválido').required('Ingrese su correo'),
	password: yup.string().required('Ingrese su contraseña'),
});

export default esquemaSesion;
