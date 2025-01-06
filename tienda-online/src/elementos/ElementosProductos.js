import styled from 'styled-components';

const ContenedorImgProducto = styled.div`
	width: 300px;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgb(255, 255, 255);
	border-radius: 15px;
	position: relative;

	@media (max-width: 800px) {
		width: 250px;
		min-height: 250px;
		height: 250px;
	}

	& > img {
		width: 250px;
		height: 250px;
		object-fit: contain;

		@media (max-width: 800px) {
			width: 200px;
			height: 200px;
		}
	}
`;

const ContenedorDatosProducto = styled.form`
	width: 550px;
	height: 400px;
	background: transparent;
	display: flex;
	align-items: start;
	justify-content: space-evenly;
	flex-direction: column;

	@media (max-width: 800px) {
		min-height: 300px;
		justify-content: center;
		gap: 0px;
		align-items: center;
	}
`;

const AgruparDetalles = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;

	@media (max-width: 800px) {
		max-height: 250px;
		align-items: center;
		justify-content: flex-start;
		gap: 5px;
	}
`;

const DatosProducto = styled.span`
	font-size: ${(props) => {
		if (props.$nombre) {
			return '24px';
		} else if (props.$marca) {
			return '14px';
		} else if (props.$precio) {
			return '35px';
		} else if (props.$cantidad) {
			return '22px';
		} else {
			return '12px';
		}
	}};
	font-weight: ${(props) => {
		if (props.$nombre || props.$marca) {
			return '500';
		} else if (props.$cantidad || props.$precio) {
			return '550';
		}
	}};
	text-transform: capitalize;
	letter-spacing: 1px;
	color: #fff;
	text-indent: 30px;

	@media (max-width: 800px) {
		text-indent: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		justify-content: center;
		font-size: ${(props) => {
			if (props.$nombre) {
				return '22px';
			} else if (props.$marca) {
				return '12px';
			} else if (props.$precio) {
				return '27px';
			} else if (props.$cantidad) {
				return '18px';
			} else {
				return '10px';
			}
		}};
	}
`;

const BotonAgregar = styled.button`
	margin-left: 30px;
	width: 80%;
	height: 45px;
	text-transform: uppercase;
	text-align: center;
	border: none;
	border-radius: 8px;
	background: ${(props) => {
		if (props.$estaEnCarrito) {
			return 'rgb(255, 174, 0)';
		} else {
			return 'rgb(55, 255, 0)';
		}
	}};
	font-size: 23px;
	font-weight: 550;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	gap: 15px;
	cursor: pointer;

	& > svg {
		width: 23px;
		height: 23px;
		transition: 0.5s;
	}

	&:hover > svg {
		margin-left: 0px;
		transform: scale(1.1);
	}

	@media (max-width: 800px) {
		margin-left: 0px;
		width: 70%;
		font-size: 18px;
	}
`;

const ContenedorCantidad = styled.div`
	width: 80%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 30px;

	@media (max-width: 800px) {
		width: 60%;
	}

	& > div {
		width: 150px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		@media (max-width: 800px) {
			min-width: 175px;
		}
	}

	& > div > input {
		background: none;
		width: 60px;
		border: 2px solid white;
		height: 40px;
		font-size: 18px;
		font-weight: 550;
		text-align: center;
		border-radius: 5px;
		border: 3px solid #ffffff;
		outline: none;
		color: #ffffff;
	}

	& > div > svg {
		width: 15px;
		height: 15px;
		color: #ffffff;
		cursor: pointer;

		@media (max-width: 800px) {
			width: 20px;
			height: 20px;
		}
	}
`;

const ErrorCantidad = styled.span`
	color: ${(props) => {
		if (props.$usuario || props.$detalle) {
			return 'rgb(211, 0, 0)';
		} else {
			return 'rgb(255, 213, 0)';
		}
	}};
	font-weight: ${(props) => {
		if (props.$detalle) {
			return '500';
		} else {
			return '550';
		}
	}};
	font-size: ${(props) => {
		if (props.$detalle) {
			return '13px';
		} else {
			return '17px';
		}
	}};
	text-indent: ${(props) => {
		if (props.$usuario || props.$detalle) {
			return '0px';
		} else {
			return '30px';
		}
	}};
	text-transform: none;
	max-width: 75%;
	height: auto;
	word-wrap: wrap;

	@media (max-width: 800px) {
		max-width: ${(props) => {
			if (props.$nombre) {
				return '50%';
			} else {
				return '85%';
			}
		}};
		text-indent: 0px;
		font-size: 15px;
		padding-bottom: 10px;
	}
`;

const ProductoAgotado = styled.span`
	width: 100%;
	height: 20px;
	font-size: 17px;
	font-weight: 550;
	color: rgb(255, 51, 51);
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-indent: 30px;

	@media (max-width: 800px) {
		justify-content: center;
		text-indent: 0px;
		font-size: 18px;
	}
`;

export {
	ContenedorImgProducto,
	ContenedorDatosProducto,
	AgruparDetalles,
	DatosProducto,
	BotonAgregar,
	ContenedorCantidad,
	ErrorCantidad,
	ProductoAgotado,
};
