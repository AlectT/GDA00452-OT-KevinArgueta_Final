// Función para dar formato de moneda Guatemalteca a los precios
const formatearCantidad = (cantidad) => {
	return new Intl.NumberFormat('es-GT', {
		style: 'currency',
		currency: 'GTQ',
	}).format(cantidad);
};

export default formatearCantidad;
