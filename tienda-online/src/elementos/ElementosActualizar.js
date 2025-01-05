import styled from 'styled-components';

const ContenedorActualizarElementos = styled.section`
	height: 100%;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	gap: 30px;
	padding-top: 30px;
	padding-bottom: 30px;
	overflow-x: hidden;
	overflow-y: auto;
	border: none;
`;

const ElementosActualizar = styled.article`
	width: 80%;
	min-height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	border-radius: 12px;
	background: rgb(255, 255, 255);
	height: auto;

	@media (max-width: 800px) {
		width: 85%;
		min-height: 150px;
		flex-direction: column;
	}
`;

const NombreActualizar = styled.h2`
	font-size: 40px;
	font-weight: 500;
	min-height: 100%;
	width: ${(props) => {
		if (props.$cliente) {
			return '90%';
		} else {
			return '70%';
		}
	}};
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-left: 15px;
	height: auto;
	text-transform: capitalize;

	@media (max-width: 800px) {
		min-height: 50%;
		width: calc(100% - 10px);
		font-size: 25px;
		margin-left: 15px;
	}
`;

const ContenedorAccionesActualizar = styled.div`
	width: ${(props) => {
		if (props.$cliente) {
			return '10%';
		} else {
			return '30%';
		}
	}};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	@media (max-width: 800px) {
		min-height: 50%;
		width: 100%;
	}
`;

const CambiarEstadosActualizar = styled.button`
	width: 125px;
	height: 40px;
	border: ${(props) => {
		if (props.$activar) {
			return '2px solid rgb(18, 202, 48)';
		} else {
			return '2px solid rgb(255, 0, 0)';
		}
	}};
	border-radius: 12px;
	background: rgb(255, 255, 255);
	font-size: 17px;
	text-transform: uppercase;
	font-weight: 550;
	color: ${(props) => {
		if (props.$activar) {
			return 'rgb(18, 202, 48)';
		} else {
			return 'rgb(255, 0, 0)';
		}
	}};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
	transition: 0.5s ease all;

	&:hover {
		background: ${(props) => {
			if (props.$activar) {
				return 'rgb(18, 202, 48)';
			} else {
				return 'rgb(255, 0, 0)';
			}
		}};
		color: rgb(255, 255, 255);
	}
`;

const BotonActualizar = styled.a`
	width: 40px;
	height: 40px;
	border: none;
	border-radius: 12px;
	background: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	text-decoration: none;

	& > svg {
		width: 30px;
		height: 30px;
		color: rgb(255, 196, 0);
	}
`;

export {
	ContenedorActualizarElementos,
	ElementosActualizar,
	NombreActualizar,
	ContenedorAccionesActualizar,
	CambiarEstadosActualizar,
	BotonActualizar,
};
