import * as yup from 'yup';

const esquemaAgregarCategoria = yup.object().shape({
	nombre: yup.string().required('Ingrese el nombre del producto'),
});

export default esquemaAgregarCategoria;
