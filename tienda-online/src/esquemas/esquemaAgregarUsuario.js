import * as yup from 'yup';
import { calcularEdad } from '../hooks/fechas';

const esquemaAgregarUsuario = yup.object().shape({
	rol: yup
		.number('Rol inválido')
		.min(1, 'Ingrese un rol válido')
		.max(2, 'Ingese un rol valido')
		.typeError('Ingrese un rol válido')
		.integer('Ingese un rol válido')
		.required('Ingrese el rol del usuario'),
	correo: yup
		.string()
		.email('Ingrese un correo válido')
		.typeError('Ingrese un rol válido')
		.required('Ingrese un correo'),
	nombre: yup.string().required('Ingrese un correo'),
	password: yup
		.string()
		.min(5, 'Ingrese una contraseña más segura')
		.max(12, 'Máximo de caracteres 8')
		.required('Ingrese una contraseña'),
	confirmarPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
		.required('Confirme la contraseña'),
	telefono: yup
		.string()
		.min(8, 'Número de teléfono inválido')
		.max(8, 'Número de teléfono inválido')
		.required('Ingrese un número de teléfono'),
	fechaNacimiento: yup
		.date()
		.test('fecha', 'El usuario debe ser mayor de edad', (value) => {
			return calcularEdad(value, new Date()) >= 18;
		})
		.typeError('Ingrese una fecha válida')
		.required('Ingrese la fecha de nacimiento'),
});

export default esquemaAgregarUsuario;
