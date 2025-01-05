import React from 'react';
import {
	ContenedorDatosUsuario,
	DatoUsuario,
	BotonEditarPerfil,
	ContenedorPerfil,
} from './../elementos/ElementosPerfil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const DatosUsuario = ({ datos, estadoFormulario, cambiarEstadoFormulario }) => {
	return (
		<>
			{datos &&
				datos.map((usuario, index) => {
					return (
						<ContenedorPerfil key={index}>
							<FontAwesomeIcon icon={faUserCircle} />
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Nombre: </DatoUsuario>
								<DatoUsuario $nombre>{usuario.nombre_completo}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Correo: </DatoUsuario>
								<DatoUsuario>{usuario.correo_electronico}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Fecha de Nacimiento: </DatoUsuario>
								<DatoUsuario>{usuario.fecha_nacimiento}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Telefono: </DatoUsuario>
								<DatoUsuario>{usuario.telefono}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<DatoUsuario $cabezera>Estado: </DatoUsuario>
								<DatoUsuario>{usuario.nombre}</DatoUsuario>
							</ContenedorDatosUsuario>
							<ContenedorDatosUsuario>
								<BotonEditarPerfil
									type="button"
									onClick={() => cambiarEstadoFormulario(!estadoFormulario)}
								>
									Editar
								</BotonEditarPerfil>
							</ContenedorDatosUsuario>
						</ContenedorPerfil>
					);
				})}
		</>
	);
};

export default DatosUsuario;
