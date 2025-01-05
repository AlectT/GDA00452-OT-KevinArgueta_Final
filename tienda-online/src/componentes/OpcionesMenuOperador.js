import React, { useState } from 'react';
import { ListaMenu, ContenedorOpciones, Opciones } from '../elementos/ElementosMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const OpcionesMenuOperador = () => {
	// Estados para mostrar u ocultar las opciones
	const [estadoListaAgregar, cambiarEstadoListaAgregar] = useState(false);
	const [estadoListaActualizar, cambiarEstadoListaActualizar] = useState(false);
	return (
		<>
			<ListaMenu
				$estado={estadoListaAgregar}
				onClick={() => cambiarEstadoListaAgregar(!estadoListaAgregar)}
			>
				<span>Agregar elementos</span>
				<FontAwesomeIcon icon={!estadoListaAgregar ? faAngleDown : faAngleUp} />
			</ListaMenu>
			<ContenedorOpciones $estado={estadoListaAgregar}>
				<Opciones href={`/tienda/agregarElemento/producto`}>
					<FontAwesomeIcon icon={faPlus} /> Agregar nuevo Producto
				</Opciones>
				<Opciones href={`/tienda/agregarElemento/categoria`}>
					<FontAwesomeIcon icon={faPlus} /> Agregar nueva Categoria
				</Opciones>
				<Opciones href={`/tienda/agregarElemento/cliente`}>
					<FontAwesomeIcon icon={faPlus} /> Registrar nuevo Cliente
				</Opciones>
				<Opciones href={`/tienda/agregarElemento/usuario`}>
					<FontAwesomeIcon icon={faPlus} /> Registrar nuevo Usuario
				</Opciones>
			</ContenedorOpciones>
			<ListaMenu
				$estado={estadoListaActualizar}
				onClick={() => cambiarEstadoListaActualizar(!estadoListaActualizar)}
			>
				<span>Actualizar elementos</span>
				<FontAwesomeIcon icon={!estadoListaActualizar ? faAngleDown : faAngleUp} />
			</ListaMenu>
			<ContenedorOpciones $estado={estadoListaActualizar}>
				<Opciones href="/tienda/actualizarElemento/producto">
					<FontAwesomeIcon icon={faEdit} /> Actualizar Producto
				</Opciones>
				<Opciones href="/tienda/actualizarElemento/categoria">
					<FontAwesomeIcon icon={faEdit} /> Actualizar Categoria
				</Opciones>
				<Opciones href="/tienda/actualizarElemento/cliente">
					<FontAwesomeIcon icon={faEdit} /> Actualizar Cliente
				</Opciones>
				<Opciones href="/tienda/actualizarElemento/usuario">
					<FontAwesomeIcon icon={faEdit} /> Actualizar Usuario
				</Opciones>
			</ContenedorOpciones>
		</>
	);
};

export default OpcionesMenuOperador;
