import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error404 from './componentes/Error404';
import IniciarSesion from './componentes/IniciarSesion';
import Inicio from './componentes/Inicio';
import { ProveedorSesion } from './contextos/contextoSesion';
import RutaPrivada from './componentes/RutaPrivada';
import DetallesProductos from './componentes/DetallesProducto';
import Carrito from './componentes/Carrito';
import ProductosCategorias from './componentes/ProductosCategorias';
import Perfil from './componentes/Perfil';
import ComprarCarrito from './componentes/ComprarCarrito';
import HistorialCarritos from './componentes/HistorialCarritos';
import BuscarProductoNombre from './componentes/BuscarProductoNombre';
import AgregarElementos from './componentes/AgregarElementos';
import InicioActualizarElementos from './componentes/InicioActualizarElemento';
import ActualizarElementos from './componentes/ActualizarElemento';
import ProductosGuardados from './componentes/ProductosGuardados';

const App = () => {
	// Declaración y preparación de todas las rutas y links privados para la aplicación
	return (
		<>
			<ProveedorSesion>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<IniciarSesion />} />
						<Route
							path="/tienda"
							element={
								<RutaPrivada>
									<Inicio />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/producto/:id"
							element={
								<RutaPrivada>
									<DetallesProductos />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/carrito/:id"
							element={
								<RutaPrivada>
									<Carrito />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/categorias/:nombre"
							element={
								<RutaPrivada>
									<ProductosCategorias />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/productos/:nombre"
							element={
								<RutaPrivada>
									<BuscarProductoNombre />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/perfil/:id"
							element={
								<RutaPrivada>
									<Perfil />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/carrito/comprar/:id"
							element={
								<RutaPrivada>
									<ComprarCarrito />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/historialCompras/:id/"
							element={
								<RutaPrivada>
									<HistorialCarritos />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/productosGuardados/"
							element={
								<RutaPrivada>
									<ProductosGuardados />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/agregarElemento/:elemento"
							element={
								<RutaPrivada>
									<AgregarElementos />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/actualizarElemento/:elemento/:id"
							element={
								<RutaPrivada>
									<ActualizarElementos />
								</RutaPrivada>
							}
						/>
						<Route
							path="/tienda/actualizarElemento/:elemento"
							element={
								<RutaPrivada>
									<InicioActualizarElementos />
								</RutaPrivada>
							}
						/>
						<Route path="*" element={<Error404 />} />
					</Routes>
				</BrowserRouter>
			</ProveedorSesion>
		</>
	);
};

export default App;
