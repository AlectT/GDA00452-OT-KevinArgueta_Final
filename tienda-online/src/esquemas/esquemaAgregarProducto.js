import * as yup from 'yup';

const esquemaAgregarProducto = yup.object().shape({
	categoria: yup
		.number('Solo se puede ingresar numeros')
		.integer('Ingrese un ID válido')
		.typeError('Ingrese un ID válido')
		.required('Ingrese una categoria'),
	nombre: yup.string().required('Ingrese el nombre del producto'),
	marca: yup.string().required('Ingrese la marca del producto'),
	codigo: yup.string().required('Ingrese el código del producto'),
	stock: yup
		.number()
		.min(0, 'El stock no puede ser menor a 0')
		.integer('Ingrese una cantidad válida')
		.typeError('Solo se puede ingresar números enteros')
		.required('Ingrese el stock'),
	precio: yup
		.string()
		.min(1, 'Ingrese un precio válido')
		.required('Ingrese el precio del producto'),
	foto: yup.mixed().test('foto', 'La imagen excede el peso permitido', (foto) => {
		if (foto.length > 0) {
			return !(foto[0].size > 50000);
		} else {
			return true;
		}
	}),
});

export default esquemaAgregarProducto;
