import * as yup from 'yup';

const esquemaBuscarProducto = yup.object().shape({
	producto: yup.string().min(1).required('Ingrese su un producto'),
});

export default esquemaBuscarProducto;
