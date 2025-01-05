import { useState, useEffect } from 'react';
import { useAuth } from '../contextos/contextoSesion';

// Función para obtener el carrito actual de cada usuario y de ser su primera vez ingresando en la aplicación
// Se le crearía su nuevo carrito
const useObtenerCarritoActual = (url) => {
	const [carritoActual, cambiarCarritoActual] = useState(null);
	const { cSesion, idU } = useAuth();

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
				.then((data) => {
					const body = {
						usuario: idU,
					};
					if (!data[0] || data[0].idEstados !== 7) {
						fetch('http://localhost:4000/agregarOrden', {
							method: 'POST',
							body: JSON.stringify(body),
							headers: {
								'Content-type': 'application/json',
								accept: 'application/json',
								Authorization: cSesion,
							},
						}).then(() => {
							fetch(url, {
								method: 'GET',
								headers: {
									'Content-type': 'application/json',
									accept: 'application/json',
									Authorization: cSesion,
								},
							})
								.then((res) => res.json())
								.then((nuevoCarrito) => {
									cambiarCarritoActual(nuevoCarrito);
								});
						});
					} else {
						cambiarCarritoActual(data);
					}
				})
				.catch((err) => console.log(err));
		}
	}, [url, cSesion, idU]);
	return carritoActual;
};

export default useObtenerCarritoActual;
