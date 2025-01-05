import React from 'react';
import useObtenerDatos from '../hooks/useObtenerDatos';
import Ordenes from './Ordenes';

const InicioOrdendes = () => {
	const { datos } = useObtenerDatos(`http://localhost:4000/obtenerOrdenes`);
	return datos && <Ordenes datos={datos} />;
};

export default InicioOrdendes;
