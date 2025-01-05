// Función para determinar el día siguiente de la fecha requerida
const fechaSiguiente = (fecha) => {
	return new Date(fecha.getTime() + 24 * 60 * 60 * 1000);
};

// Meses del año
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

// Función para saber el tiempo transcurrido entre 2 fechas
const diferenciaFecha = (fechaCreacion) => {
	const fechaInicio = new Date(fechaCreacion).getTime();
	const fechaFin = new Date().getTime();

	const diferencia = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);

	return diferencia;
};

// Función para determinar la edad desde cierta fecha
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
