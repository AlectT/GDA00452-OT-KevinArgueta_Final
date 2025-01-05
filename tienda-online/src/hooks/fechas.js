const fechaSiguiente = (fecha) => {
	return new Date(fecha.getTime() + 24 * 60 * 60 * 1000);
};

const meses = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

const diferenciaFecha = (fechaCreacion) => {
	const fechaInicio = new Date(fechaCreacion).getTime();
	const fechaFin = new Date().getTime();

	const diferencia = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);

	return diferencia;
};

const calcularEdad = (fecha) => {
	const hoy = new Date();
	const nacimiento = new Date(fecha);
	let edad = hoy.getFullYear() - nacimiento.getFullYear();
	const m = hoy.getMonth() - nacimiento.getMonth();

	if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
		edad--;
	}

	return edad;
};

export { fechaSiguiente, meses, diferenciaFecha, calcularEdad };