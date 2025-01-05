const formatearCantidad = (cantidad) => {
	return new Intl.NumberFormat('es-GT', {
		style: 'currency',
		currency: 'GTQ',
	}).format(cantidad);
};

export default formatearCantidad;
