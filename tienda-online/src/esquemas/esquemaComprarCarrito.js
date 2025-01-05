import * as yup from 'yup';
import { fechaSiguiente, meses } from '../hooks/fechas';

const diaSiguiente = fechaSiguiente(new Date());

const esquemaComprarCarrito = yup.object().shape({
	nombre: yup
		.string()
		.min(6, 'Ingrese al menos un nombre y un apellido')
		.required('Ingrese su nombre'),
	direccion: yup
		.string()
		.min(15, 'Ingrese una dirección más detallada')
		.required('Ingrese su direccion'),
	telefono: yup
		.string('Solo puede ingresar números')
		.min(8, 'Número de telefono inválido')
		.max(8, 'Número de telefono inválido')
		.typeError('Solo puede ingresar números')
		.required('Ingrese un número de teléfono'),
	correo: yup.string().email('Correo inválido').required('Ingrese su correo'),
	fecha: yup
		.date()
		.min(
			new Date(),
			`Debe ingresar una fecha a partir del ${diaSiguiente.getDate()} de ${
				meses[diaSiguiente.getMonth()]
			} del ${diaSiguiente.getFullYear()}  `,
		)
		.typeError('Ingrese una fecha')
		.required('Ingrese una fecha'),
});

export default esquemaComprarCarrito;
