import * as yup from 'yup';

const esquemaAgregarCliente = yup.object().shape({
	razonSocial: yup.string(),
	nombreComercial: yup.string(),
	telefono: yup
		.string()
		.min(8, 'Número de teléfono inválido')
		.max('8', 'Número de teléfono inválido')
		.required('Ingrese el teléfono del cliente'),
	email: yup.string().required('Ingrese el correo del cliente'),
	direccion: yup.string().required('Ingrese la direccion del cliente'),
});

export default esquemaAgregarCliente;
