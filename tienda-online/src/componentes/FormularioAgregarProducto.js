import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import {
	ContenedorFormularioAgregar,
	ContenedorInputFile,
	InputFile,
	ContenedorInputFormulario,
	ContenedorSeparador,
	DatoSolicitado,
	InputDato,
	InputSelect,
	ContenedorBotonFormulario,
	ImagenPre,
} from '../elementos/ElementosFormularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import useObtenerDatos from '../hooks/useObtenerDatos';
import { useAuth } from '../contextos/contextoSesion';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import esquemaAgregarProducto from '../esquemas/esquemaAgregarProducto';
import { ErrorCantidad } from '../elementos/ElementosProductos';

const FormularioAgregarProducto = ({ dataActualizar, cambiarEstadoAlerta, cambiarAlerta }) => {
	const { datos } = useObtenerDatos('http://localhost:4000/obtenerCategorias');
	const [imagenPrevisualizada, cambiarImagenPrevisualizada] = useState(null);
	const { idU, rol, cSesion } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(esquemaAgregarProducto) });

	// Lógica para mostrar la imagen seleccionada en el input file
	const previsualizarImagen = (e) => {
		if (e) {
			const imagen = e.target.files;
			if (imagen.length > 0) {
				const imagenUrl = URL.createObjectURL(imagen[0]);
				cambiarImagenPrevisualizada(imagenUrl);
			}
		}
	};

	// Convertir la imagen a base64 para mandarla al API
	const t64 = (file) =>
		new Promise((res, rej) => {
			const leerImagen = new FileReader();
			leerImagen.readAsDataURL(file);
			leerImagen.onload = () => res(leerImagen.result);
		});

	// Lógica para evitar que usuarios con rol de cliente ingresen a la interfaz de operador
	useEffect(() => {
		if (rol && rol !== 'O') {
			navigate('/tienda');
		}
	}, [rol, navigate]);

	// Lógica para agregar un producto con o sin foto a traves de una petición al API
	const onSubmit = (body) => {
		if (body.foto[0]) {
			const imagen = body.foto[0];
			t64(imagen).then((res) => {
				body.usuario = idU;
				body.foto = res;
				body.foto = body.foto.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
				fetch('http://localhost:4000/agregarProducto', {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Content-type': 'application/json',
						accept: 'application/json',
						Authorization: cSesion,
					},
				})
					.then((res) => {
						if (res.status === 400) {
							cambiarEstadoAlerta(true);
							cambiarAlerta({
								color: 'error',
								mensaje: 'No se pudo agregar el producto',
							});
						} else {
							cambiarEstadoAlerta(true);
							cambiarAlerta({
								color: 'exito',
								mensaje: 'Producto agregado correctamente',
							});
							cambiarImagenPrevisualizada(null);
							reset();
						}
					})
					.catch((error) => console.log(error));
			});
		} else {
			body.usuario = idU;
			body.foto = null;
			fetch('http://localhost:4000/agregarProducto', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json',
					Authorization: cSesion,
				},
			})
				.then((res) => {
					if (res.status === 400) {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'error',
							mensaje: 'No se pudo agregar el producto',
						});
					} else {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'exito',
							mensaje: 'Producto agregado correctamente',
						});
						reset();
					}
				})
				.catch((error) => console.log(error));
		}
	};

	// Lógica para actualizar un producto con o sin foto a traves de una petición al API
	const onUpdate = (body) => {
		if (body.foto[0]) {
			t64(body.foto[0]).then((res) => {
				body.foto = res;
				body.foto = body.foto.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
				fetch(`http://localhost:4000/actualizarProducto/${dataActualizar[0].idProductos}`, {
					method: 'PUT',
					body: JSON.stringify(body),
					headers: {
						'Content-type': 'application/json',
						accept: 'application/json',
						Authorization: cSesion,
					},
				})
					.then((res) => {
						if (res.status === 400) {
							cambiarEstadoAlerta(true);
							cambiarAlerta({
								color: 'error',
								mensaje: 'No se pudo actualizar el producto',
							});
						} else {
							window.location.reload(true);
						}
					})
					.catch((error) => console.log(error));
			});
		} else {
			body.foto = dataActualizar ? dataActualizar[0].foto : null;
			fetch(`http://localhost:4000/actualizarProducto/${dataActualizar[0].idProductos}`, {
				method: 'PUT',
				body: JSON.stringify(body),
				headers: {
					'Content-type': 'application/json',
					accept: 'application/json',
					Authorization: cSesion,
				},
			})
				.then((res) => {
					if (res.status === 400) {
						cambiarEstadoAlerta(true);
						cambiarAlerta({
							color: 'error',
							mensaje: 'No se pudo actualizar el producto',
						});
					} else {
						window.location.reload(true);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	// Previsualizar la imagen del producto si se actualizará información
	useEffect(() => {
		if (dataActualizar && dataActualizar[0].foto !== null) {
			const byteFoto = atob(dataActualizar[0].foto);
			const sizeFoto = byteFoto.length;
			const bytesImagen = new Uint8Array(sizeFoto);
			for (let i = 0; i < sizeFoto; i++) {
				bytesImagen[i] = byteFoto.charCodeAt(i);
			}

			const blob = new Blob([bytesImagen], { type: 'image/png' });
			const url = URL.createObjectURL(blob);

			cambiarImagenPrevisualizada(url);
		}
	}, [dataActualizar]);

	return (
		datos !== null && (
			<ContenedorFormularioAgregar
				encType="multipart/form-data"
				$producto
				onSubmit={!dataActualizar ? handleSubmit(onSubmit) : handleSubmit(onUpdate)}
			>
				<ContenedorInputFile>
					<InputFile>
						{!imagenPrevisualizada && (
							<>
								<span>{!dataActualizar ? 'Agregar' : 'Actualizar'} foto</span>
								<FontAwesomeIcon icon={faCamera} />
								<input
									type="file"
									accept="image/*"
									{...register('foto', {
										onChange: (e) => {
											previsualizarImagen(e);
										},
									})}
								/>
							</>
						)}
						{imagenPrevisualizada !== null && (
							<>
								<ImagenPre src={imagenPrevisualizada} />
								<input
									type="file"
									accept="img/*"
									{...register('foto', { onChange: (e) => previsualizarImagen(e) })}
								/>
							</>
						)}
					</InputFile>
					{errors.foto && <ErrorCantidad $detalle>{errors.foto.message}</ErrorCantidad>}
				</ContenedorInputFile>
				<ContenedorSeparador $producto>
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Categoria del producto
							{errors.categoria && <ErrorCantidad $detalle>{errors.categoria.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputSelect {...register('categoria')}>
							{datos.map((categoria, index) => {
								return (
									categoria.idEstados === 3 && (
										<option
											key={index}
											selected={
												dataActualizar &&
												dataActualizar[0].idCategoriaProductos === categoria.idCategoriaProductos
													? true
													: false
											}
											value={categoria.idCategoriaProductos}
										>
											{categoria.nombre}
										</option>
									)
								);
							})}
						</InputSelect>
					</ContenedorInputFormulario>
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Nombre del producto
							{errors.nombre && <ErrorCantidad $detalle>{errors.nombre.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputDato
							type="text"
							{...register('nombre', { value: dataActualizar ? dataActualizar[0].nombre : '' })}
						/>
					</ContenedorInputFormulario>
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Marca del producto
							{errors.marca && <ErrorCantidad $detalle>{errors.marca.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputDato
							type="text"
							{...register('marca', { value: dataActualizar ? dataActualizar[0].marca : '' })}
						/>
					</ContenedorInputFormulario>

					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Código
							{errors.codigo && <ErrorCantidad $detalle>{errors.codigo.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputDato
							type="text"
							{...register('codigo', { value: dataActualizar ? dataActualizar[0].codigo : '' })}
						/>
					</ContenedorInputFormulario>
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Stock
							{errors.stock && <ErrorCantidad $detalle>{errors.stock.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputDato
							type="number"
							{...register('stock', { value: dataActualizar ? dataActualizar[0].stock : '' })}
						/>
					</ContenedorInputFormulario>
					<ContenedorInputFormulario $usuario>
						<DatoSolicitado>
							Precio
							{errors.precio && <ErrorCantidad $detalle>{errors.precio.message}</ErrorCantidad>}
						</DatoSolicitado>
						<InputDato
							type="text"
							{...register('precio', {
								value: dataActualizar ? dataActualizar[0].precio : '',
								onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9.]/g, '')),
							})}
						/>
					</ContenedorInputFormulario>
					<ContenedorBotonFormulario $usuario>
						<button type="submit">{!dataActualizar ? 'Agregar' : 'Actualizar'} producto</button>
					</ContenedorBotonFormulario>
				</ContenedorSeparador>
			</ContenedorFormularioAgregar>
		)
	);
};

export default FormularioAgregarProducto;
