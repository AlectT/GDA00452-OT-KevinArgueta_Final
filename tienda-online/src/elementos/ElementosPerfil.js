import styled from 'styled-components';

const ContenedorPerfil = styled.section`
	min-width: 35vw;
	width: auto;
	height: 550px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	border-radius: 10px;
	background: rgb(255, 255, 255);
	width: 35vw;

	& > svg {
		width: 100px;
		height: 100px;
	}

	@media (max-width: 800px) {
		width: 82vw;
	}
`;

const ContenedorDatosUsuario = styled.article`
	width: 80%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	@media (max-width: 800px) {
		width: 90%;
		gap: 5px;
	}
`;

const DatoUsuario = styled.span`
	width: auto;
	height: auto;
	font-size: 17px;
	font-weight: ${(props) => {
		if (props.$cabezera) {
			return '520';
		} else {
			return '300';
		}
	}};
	color: rgb(18, 15, 47);
	text-transform: ${(props) => {
		if (props.$nombre) {
			return 'capitalize';
		} else {
			return 'none';
		}
	}};
`;

const BotonEditarPerfil = styled.button`
	width: auto;
	height: auto;
	padding: 8px 30px;
	font-size: 19px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	background: ${(props) => {
		if (props.$editar) {
			return 'rgb(255, 149, 0)';
		} else if (props.$cancelar) {
			return 'rgb(215, 7, 0)';
		} else {
			return 'rgb(37, 218, 5)';
		}
	}};
	color: rgb(255, 255, 255);
	border-radius: 10px;
	border: none;
	cursor: pointer;

	@media (max-width: 800px) {
		padding: 6px 20px;
	}
`;

const FormularioEditarDatosUsuario = styled.form`
	width: 30vw;
	height: 550px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	border-radius: 10px;
	background: rgb(255, 255, 255);
	min-width: 400px;

	& > svg {
		width: 100px;
		height: 100px;
	}
`;

const InputEditarUsuario = styled.input`
	height: 35px;
	text-transform: capitalize;
	width: ${(props) => {
		if (props.$telefono) {
			return '150px';
		} else {
			return '300px';
		}
	}};
	letter-spacing: ${(props) => {
		if (props.$telefono) {
			return '2px';
		} else {
			return '0';
		}
	}};
	outline: none;
	border: none;
	font-size: 18px;
	border-bottom: 2px solid rgb(13, 13, 52);
	color: rgb(13, 13, 52);
	background: rgb(255, 255, 255);
	text-indent: 10px;
`;

export {
	ContenedorPerfil,
	ContenedorDatosUsuario,
	DatoUsuario,
	BotonEditarPerfil,
	FormularioEditarDatosUsuario,
	InputEditarUsuario,
};
