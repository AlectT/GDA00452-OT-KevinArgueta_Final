import React, { useState } from 'react';
import { ListaMenu, ContenedorOpciones, Opciones } from '../elementos/ElementosMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const OpcionesMenuCliente = ({ categorias }) => {
	const [estadoListaCategorias, cambiarEstadoListaCategorias] = useState(false);

	return (
		<>
			<ListaMenu
				$estado={estadoListaCategorias}
				onClick={() => cambiarEstadoListaCategorias(!estadoListaCategorias)}
			>
				<span>Categorias</span>
				<FontAwesomeIcon icon={!estadoListaCategorias ? faAngleDown : faAngleUp} />
			</ListaMenu>
			<ContenedorOpciones $estado={estadoListaCategorias}>
				{categorias.map((categoria, index) => {
					return (
						categoria.idEstados === 3 && (
							<Opciones key={index} href={`/tienda/categorias/${categoria.nombre}`}>
								<FontAwesomeIcon icon={faSearch} />
								<span> {categoria.nombre} </span>
							</Opciones>
						)
					);
				})}
			</ContenedorOpciones>
		</>
	);
};

export default OpcionesMenuCliente;
