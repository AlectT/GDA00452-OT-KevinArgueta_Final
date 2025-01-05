import { useState, useEffect } from 'react';
import { useAuth } from '../contextos/contextoSesion';

const useObtenerDatos = (url) => {
	const [datos, cambiarDatos] = useState(null);
	const { cSesion } = useAuth();

	useEffect(() => {
		if (cSesion) {
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json',
					Authorization: cSesion,
				},
			})
				.then((res) => res.json())
				.then((data) => cambiarDatos(data))
				.catch((err) => console.log(err));
		}
	}, [url, cSesion]);
	return { datos };
};

export default useObtenerDatos;
