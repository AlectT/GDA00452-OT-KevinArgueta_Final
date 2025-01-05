import styled from 'styled-components';

const ContenedorMenu = styled.aside`
	width: 450px;
	height: 100vh;
	position: absolute;
	left: ${(props) => {
		if (props.$menuActivo) {
			return '0px';
		} else if (!props.$menuActivo) {
			return '-450px';
		}
	}};
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: rgb(35, 29, 74);
	color: #ffffff;
	z-index: 6;
	transition: 0.5s ease all;

	@media (max-width: 800px) {
		width: 375px;
	}
`;

const CerrarMenu = styled.button`
	position: absolute;
	top: 20px;
	left: ${(props) => {
		if (props.$menuActivo) {
			return '15px';
		} else if (!props.$menuActivo) {
			return '-40px';
		}
	}};
	width: 40px;
	height: 40px;
	color: rgb(177, 177, 177);
	z-index: 7;
	background: none;
	border: none;
	cursor: pointer;
	transition: 0.4s ease all;

	& > svg {
		width: 100%;
		height: 100%;
		transition: 0.5s ease all;
	}

	& > svg:hover {
		color: #ffffff;
	}
`;

const FondoOpaco = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: ${(props) => {
		if (props.$menuActivo) {
			return 'rgba(0,0,0,0.4)';
		} else if (!props.$menuActivo) {
			return 'transparent';
		}
	}};
	backdrop-filter: blur(2px);
	transition: 1s ease all;
	z-index: 4;
`;

const ContenedorIcono = styled.div`
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;

	& > svg {
		height: 110px;
		width: 110px;
		color: #fff;
	}
`;

const BotonPerfil = styled.a`
	width: auto;
	height: auto;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 17px;
	font-weight: 530;
	background: rgb(43, 34, 99);
	text-decoration: none;
	color: #ffffff;
	padding: 10px 20px;
	border-radius: 7px;
	cursor: pointer;
`;

const ContenedorListaMenu = styled.div`
	width: 100%;
	min-height: 300px;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	gap: 10px;
	margin-top: 15px;
`;

const ListaMenu = styled.div`
	width: 80%;
	height: auto;
	min-height: 30px;
	color: ${(props) => {
		if (props.$estado) {
			return '#ffffff';
		} else if (!props.$estado) {
			return 'rgb(177,177,177)';
		}
	}};
	font-size: 17px;
	font-weight: 520;
	display: flex;
	align-items: center;
	justify-content: start;
	text-align: left;
	letter-spacing: 1px;
	cursor: pointer;

	& > a {
		text-decoration: none;
		color: rgb(177, 177, 177);
	}

	& > button {
		background: none;
		width: auto;
		height: auto;
		color: rgb(177, 177, 177);
		font-size: 17px;
		cursor: pointer;
		font-weight: 520;
		border: none;
	}

	& > a,
	& > button,
	& > span,
	& > svg {
		transition: 0.4s ease all;
	}

	&:hover > a,
	&:hover > span,
	&:hover > button,
	&:hover {
		color: #ffffff;
	}

	& > svg {
		width: 20px;
		height: 20px;
		margin-left: 10px;
	}
`;

const ContenedorOpciones = styled.ul`
	text-decoration: none;
	list-style: none;
	width: 70%;
	height: auto;
	min-height: 50px;
	max-height: 110px;
	overflow-y: auto;
	display: ${(props) => {
		if (props.$estado) {
			return 'flex';
		} else if (!props.$estado) {
			return 'none';
		}
	}};
	align-items: start;
	justify-content: start;
	flex-direction: column;
	gap: 5px;

	&::-webkit-scrollbar {
		width: 7px;
		transition: 1s;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.33);
		transition: 1s;
		border-radius: 12px;
	}
`;

const Opciones = styled.a`
	text-decoration: none;
	text-transform: capitalize;
	list-style: none;
	color: rgb(229, 229, 229);
	font-size: 15px;
	transition: 0.5s ease all;
	cursor: pointer;

	&:hover {
		color: #fff;
	}
`;

export {
	ContenedorMenu,
	FondoOpaco,
	ContenedorIcono,
	BotonPerfil,
	ContenedorListaMenu,
	ListaMenu,
	ContenedorOpciones,
	Opciones,
	CerrarMenu,
};
