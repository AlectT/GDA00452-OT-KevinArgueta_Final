import styled from 'styled-components';

const ContenedorCarrito = styled.section`
	width: 80vw;
	height: 500px;
	position: relative;
	background: rgb(255, 255, 255);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;

	@media (max-width: 800px) {
		width: 90vw;
	}
`;

const ProductoCarrito = styled.article`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: start;
	justify-content: start;
`;

const ContenedorDetallesCarrito = styled.div`
	width: ${(props) => {
		if (props.$formulario) {
			return '50%';
		} else {
			return '30%';
		}
	}};
	height: 100px;
	display: flex;
	flex-direction: ${(props) => {
		if (props.$botones) {
			return 'row';
		} else {
			return 'column';
		}
	}};
	align-items: ${(props) => {
		if (props.$botones) {
			return 'center';
		} else {
			return 'start';
		}
	}};
	justify-content: ${(props) => {
		if (props.$botones) {
			return 'flex-start';
		} else {
			return 'center';
		}
	}};
	gap: ${(props) => {
		if (props.$botones) {
			return '15px';
		} else {
			return '3px';
		}
	}};

	@media (max-width: 800px) {
		gap: ${(props) => {
			if (props.$botones) {
				return '10px';
			} else {
				return '3px';
			}
		}};
	}
`;

const FormularioEditarCantidad = styled.form`
	width: 60%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 3px;

	@media (max-width: 800px) {
		width: 52%;
	}
`;

const DetallesCarrito = styled.span`
	font-size: ${(props) => {
		if (props.$nombre) {
			return '20px';
		} else if (props.$marca) {
			return '15px';
		} else {
			return '14px';
		}
	}};
	font-weight: ${(props) => {
		if (props.$nombre) {
			return '550';
		} else {
			return '500';
		}
	}};
	color: rgb(28, 24, 57);
	text-indent: ${(props) => {
		if (props.$nombre || props.$marca) {
			return '15px';
		} else {
			return '0px';
		}
	}};
	text-transform: ${(props) => {
		if (props.$error) {
			return 'none';
		} else {
			return 'capitalize';
		}
	}};
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;

	@media (max-width: 800px) {
		font-size: ${(props) => {
			if (props.$nombre) {
				return '20px';
			} else if (props.$marca) {
				return '15px';
			} else {
				return '12px';
			}
		}};
	}
`;

const ImagenCarrito = styled.article`
	width: 10%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 800px) {
		width: 15%;
	}

	& > img {
		width: 70px;
		height: 70px;
		object-fit: contain;
	}
`;

const Encabezado = styled.article`
	width: 100%;
	min-height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => {
		if (props.$total) {
			return 'rgb(18, 169, 48)';
		} else {
			return 'rgb(12, 11, 49)';
		}
	}};
	color: rgb(255, 255, 255);
	gap: 10px;
	position: sticky;
	bottom: 0;

	& > div {
		font-weight: 600;
		font-size: 20px;
		margin-left: 20px;
	}

	& > a,
	& > button {
		text-transform: uppercase;
		margin-right: 20px;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		gap: 10px;
		color: rgb(255, 255, 255);
		background: ${(props) => {
			if (props.$total) {
				return 'rgb(18, 169, 48)';
			} else {
				return 'rgb(12, 11, 49)';
			}
		}};
		border-radius: 8px;
		border: none;
		padding: 5px 15px;
		transition: 0.5s ease;
		font-size: 19px;
		font-weight: 550;

		@media (max-width: 800px) {
			margin-right: 12px;
			padding: 4px 10px;
			font-size: 17px;
		}
	}

	& > a:hover,
	& > button:hover {
		color: ${(props) => {
			if (props.$total) {
				return 'rgb(18, 169, 48)';
			} else {
				return '#ffffff';
			}
		}};
		background: ${(props) => {
			if (props.$total) {
				return '#ffffff';
			} else {
				return 'rgb(255, 0, 0)';
			}
		}};
	}

	& > div > span {
		font-weight: 500;
		font-size: 17px;
		margin-right: 20px;
	}
`;

const CarritoVacio = styled.span`
	font-size: 24px;
	font-weight: 600;
	color: rgb(210, 210, 210);
`;

const BotonAccion = styled.button`
	border: none;
	cursor: pointer;
	width: 60px;
	height: 40px;
	background: none;

	& > svg {
		width: 22px;
		height: 22px;
		color: ${(props) => {
			if (props.$eliminar) {
				return 'rgb(208, 0, 0)';
			} else if (props.$actualizar) {
				return 'rgb(49, 211, 0)';
			} else {
				return 'rgb(255, 183, 0)';
			}
		}};

		@media (max-width: 800px) {
			width: 18px;
			height: 18px;
		}
	}

	@media (max-width: 800px) {
		width: 40px;
		height: 40px;
	}
`;

const InputEditarCantidad = styled.input`
	height: 15px;
	text-transform: capitalize;
	width: 40px;
	letter-spacing: 1px;
	outline: none;
	border: none;
	font-size: 16px;
	border-bottom: 2px solid rgb(13, 13, 52);
	color: rgb(13, 13, 52);
	background: rgb(255, 255, 255);
	text-align: center;
`;

export {
	ContenedorCarrito,
	ProductoCarrito,
	ContenedorDetallesCarrito,
	FormularioEditarCantidad,
	DetallesCarrito,
	ImagenCarrito,
	Encabezado,
	CarritoVacio,
	BotonAccion,
	InputEditarCantidad,
};
