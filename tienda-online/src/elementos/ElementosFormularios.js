import styled from 'styled-components';

const ContenedorCompra = styled.form`
	width: 65vw;
	height: 550px;
	display: flex;
	align-items: start;
	justify-content: flex-start;
	background: rgb(255, 255, 255);
	border-radius: 10px;
	overflow: hidden;
	position: relative;

	@media (max-width: 920px) {
		width: 85vw;
	}
`;

const ContenedorSeparador = styled.section`
	width: ${(props) => {
		if (props.$producto) {
			return '70%';
		} else {
			return '50%';
		}
	}};
	height: 550px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: ${(props) => {
		if (props.$resumen) {
			return 'center';
		} else {
			return 'center';
		}
	}};
	justify-content: ${(props) => {
		if (props.$resumen) {
			return 'space-between';
		} else {
			return 'center';
		}
	}};
	border-left: ${(props) => {
		if (props.$resumen) {
			return '2px solid rgb(223, 223, 223)';
		} else {
			return 'none';
		}
	}};
	gap: ${(props) => {
		if (!props.$resumen) {
			return '22px';
		} else {
			return 'none';
		}
	}};
	transition: 0.5s ease all;

	@media (max-width: 920px) {
		border-left: 0px;
		min-width: 100%;
		position: ${(props) => {
			if (props.$producto) {
				return 'relative';
			} else {
				return 'absolute';
			}
		}};
		transition: 0.5s ease all;
		right: ${(props) => {
			if (props.$verSeccion && props.$seccion === 'carrito') {
				return '0%';
			} else if (props.$seccion === 'formulario') {
				return 'none';
			} else if (props.$producto) {
				return 'none';
			} else {
				return '100%';
			}
		}};
		left: ${(props) => {
			if (props.$verSeccion && props.$seccion === 'formulario') {
				return '0%';
			} else if (props.$seccion === 'carrito') {
				return 'none';
			} else if (props.$producto) {
				return 'none';
			} else {
				return '100%';
			}
		}};
	}
`;

const ContenedorInputFormulario = styled.label`
	width: calc(100% - 20px);
	display: flex;
	height: ${(props) => {
		if (props.$usuario) {
			return '50px';
		} else {
			return '70px';
		}
	}};
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: ${(props) => {
		if (props.$usuario) {
			return '0px';
		} else {
			return '5px';
		}
	}};
	margin-left: 20px;
`;

const DatoSolicitado = styled.span`
	font-size: 14px;
	font-weight: 520;
	width: 100px;
	color: rgb(165, 165, 165);
	text-transform: capitalize;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;
	& > svg {
		color: rgb(165, 165, 165);
		height: 14px;
		width: 14px;
		background: rgb(255, 255, 255);
	}
`;

const InputDato = styled.input`
	/* width: 400px; */
	width: 90%;
	height: ${(props) => {
		if (props.$usuario) {
			return '35px';
		} else {
			return '50px';
		}
	}};
	outline: none;
	background: rgb(255, 255, 255);
	border: none;
	border-bottom: ${(props) => {
		if (props.$read) {
			return 'none';
		} else {
			return '2px solid rgb(20, 20, 65)';
		}
	}};
	font-size: 20px;
	font-weight: 500;
	text-indent: 2px;
`;

const ContenedorBotonFormulario = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	& > button {
		cursor: pointer;
		padding: 8px 25px;
		border: none;
		border-radius: 8px;
		text-transform: uppercase;
		background: rgb(26, 198, 0);
		color: rgb(255, 255, 255);
		font-size: 20px;
		font-weight: 550;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;

		@media (max-width: 920px) {
			padding: 8px 15px;
			font-size: 17px;
		}
	}

	& > button > svg {
		height: 20px;
		width: 20px;
	}

	@media (max-width: 920px) {
		width: 90%;
	}
`;

const EncabezadoResumen = styled.span`
	width: 100%;
	height: 50px;
	font-size: 20px;
	font-weight: 550;
	text-align: left;
	text-indent: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${(props) => {
		if (props.$encabezado) {
			return 'rgb(255,255,255)';
		} else {
			return 'rgb(15, 10, 42)';
		}
	}};
	background: ${(props) => {
		if (props.$encabezado) {
			return 'rgb(15, 10, 42)';
		} else {
			return 'rgb(255, 255, 255)';
		}
	}};
	border-top: ${(props) => {
		if (props.$encabezado) {
			return 'none';
		} else {
			return '1px solid rgb(232, 232, 232)';
		}
	}};
`;

const ContenedorResumen = styled.div`
	width: 100%;
	min-height: calc(100% - 115px);
	height: auto;
	display: flex;
	margin-top: 15px;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	gap: 5px;
`;

const DatosResumen = styled.div`
	width: 100%;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	& > div {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: 20px;
		gap: 8px;
	}
`;

const Datos = styled.span`
	font-size: ${(props) => {
		if (props.$total) {
			return '18px';
		} else {
			return '14px';
		}
	}};
	margin-right: ${(props) => {
		if (props.$derecha) {
			return '20px';
		} else {
			return '0px';
		}
	}};
	color: ${(props) => {
		if (props.$cantidad) {
			return 'rgb(201, 201, 201)';
		} else {
			return 'rgb(15, 10, 42)';
		}
	}};
	font-weight: ${(props) => {
		if (props.$cantidad || props.$total) {
			return '600';
		} else {
			return '400';
		}
	}};
	width: auto;
`;

const ContenedorFormularioAgregar = styled.form`
	width: auto;
	min-width: ${(props) => {
		if (props.$producto) {
			return '80vw';
		} else if (props.$categoria) {
			return '50vw';
		} else {
			return '40vw';
		}
	}};
	height: ${(props) => {
		if (props.$categoria) {
			return '300px';
		} else {
			return '550px';
		}
	}};
	display: flex;
	align-items: center;
	justify-content: ${(props) => {
		if (props.$usuario) {
			return 'space-around';
		} else {
			return 'space-evenly';
		}
	}};
	flex-direction: ${(props) => {
		if (props.$producto) {
			return 'row';
		} else {
			return 'column';
		}
	}};
	background: rgb(255, 255, 255);
	border-radius: 10px;
	overflow: hidden;
	padding: 10px 0px;

	@media (max-width: 920px) {
		min-width: 80vw;
		flex-direction: ${(props) => {
			if (props.$producto) {
				return 'column';
			} else {
				return 'column';
			}
		}};
		justify-content: ${(props) => {
			if (props.$usuario) {
				return 'space-around';
			} else if (props.$producto) {
				return 'flex-start';
			} else {
				return 'space-evenly';
			}
		}};
		overflow-y: ${(props) => {
			if (props.$producto) {
				return 'scroll';
			} else {
				return 'hidden';
			}
		}};
	}
`;

const ContenedorInputFile = styled.section`
	width: 40%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;

	@media (max-width: 920px) {
		width: 100%;
		min-height: 35%;
	}
`;

const InputFile = styled.div`
	width: 250px;
	height: 250px;
	border: 3px dashed rgb(9, 11, 51);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 5px;
	text-align: center;
	position: relative;

	@media (max-width: 920px) {
		width: 150px;
		height: 150px;
	}

	& > span {
		text-align: center;
		font-size: 20px;
		color: rgb(9, 11, 51);

		@media (max-width: 920px) {
			font-size: 15px;
		}
	}

	& > svg {
		width: 35px;
		height: 35px;
		color: rgb(9, 11, 51);

		@media (max-width: 920px) {
			width: 25px;
			height: 25px;
		}
	}

	& > input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
`;

const ImagenPre = styled.img`
	width: 245px;
	height: 245px;
	object-fit: contain;
	border-radius: 10px;
	padding: 10px;

	@media (max-width: 920px) {
		width: 135px;
		height: 135px;
	}
`;

const InputSelect = styled.select`
	width: 90%;
	height: 35px;
	outline: none;
	background: rgb(255, 255, 255);
	border: none;
	border-bottom: 2px solid #000;
	font-size: 20px;
	font-weight: 500;
	text-indent: 2px;
	max-height: 300px;
`;

const ContenedorInputRadio = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-wrap: nowrap;
	border: 1px solid #ff0000;
	gap: 20px;
`;

const InputRol = styled.button`
	height: 35px;
	width: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	font-size: 15px;
	font-weight: 500;
	text-transform: capitalize;
	color: ${(props) => {
		if (props.$estado === false) {
			return 'rgb(9, 11, 51)';
		} else {
			return 'rgb(255,255,255)';
		}
	}};
	background: ${(props) => {
		if (props.$estado === false) {
			return 'rgb(255,255,255)';
		} else {
			return 'rgb(9, 11, 51)';
		}
	}};
	border: ${(props) => {
		if (props.$estado === true) {
			return '2px solid rgb(9, 11, 51)';
		} else {
			return '2px solid rgb(9, 11, 51)';
		}
	}};
	border-radius: 10px;
	overflow: auto;
	gap: 5px;
	text-align: center;
	transition: 0.5s ease all;
	cursor: pointer;

	& > svg {
		width: 13px;
		height: 13px;
		color: ${(props) => {
			if (props.$estado === true) {
				return 'rgb(255,255,255)';
			} else {
				return 'transparent';
			}
		}};
		border: ${(props) => {
			if (props.$estado === true) {
				return '2px solid rgb(9, 11, 51)';
			} else {
				return '2px solid rgb(9, 11, 51)';
			}
		}};
		border-radius: 100%;
		transition: 0.5s ease all;
	}
`;

const BotonVerCarrito = styled.button`
	display: none;
	position: absolute;
	top: 8px;
	right: 15px;
	font-size: 15px;
	cursor: pointer;
	border: 2px solid rgb(9, 11, 51);
	border-radius: 8px;
	padding: 5px 10px;
	transition: 0.5s ease all;
	z-index: 3;

	color: ${(props) => {
		if (props.$seccion === 'carrito') {
			return 'rgb(15, 10, 42)';
		} else {
			return 'rgb(255,255,255)';
		}
	}};

	background: ${(props) => {
		if (props.$seccion === 'carrito') {
			return 'rgb(255, 255, 255)';
		} else {
			return 'rgb(15, 10, 42)';
		}
	}};

	border: ${(props) => {
		if (props.$seccion === 'carrito') {
			return '2px solid rgb(15, 10, 42)';
		} else {
			return '2px solid rgb(255,255,255)';
		}
	}};

	&:hover {
		color: ${(props) => {
			if (props.$seccion !== 'carrito') {
				return 'rgb(15, 10, 42)';
			} else {
				return 'rgb(255,255,255)';
			}
		}};

		background: ${(props) => {
			if (props.$seccion !== 'carrito') {
				return 'rgb(255, 255, 255)';
			} else {
				return 'rgb(15, 10, 42)';
			}
		}};
	}

	@media (max-width: 920px) {
		display: block;
	}
`;

export {
	ContenedorCompra,
	ContenedorSeparador,
	ContenedorInputFormulario,
	DatoSolicitado,
	InputDato,
	ContenedorBotonFormulario,
	EncabezadoResumen,
	ContenedorResumen,
	DatosResumen,
	Datos,
	ContenedorFormularioAgregar,
	ContenedorInputFile,
	InputFile,
	InputSelect,
	ImagenPre,
	ContenedorInputRadio,
	InputRol,
	BotonVerCarrito,
};
