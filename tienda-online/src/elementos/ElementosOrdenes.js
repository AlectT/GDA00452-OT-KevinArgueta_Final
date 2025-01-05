import styled from 'styled-components';

const ContenedorOrdenes = styled.main`
	width: 100vw;
	height: calc(100vh - 80px);
	padding-top: 40px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	background: none;
	gap: 50px;
	overflow-x: hidden;
	overflow-y: auto;
	padding-bottom: 50px;
`;

const ContenedorOrden = styled.section`
	margin-top: 15px;
	position: relative;
	width: 75vw;
	min-width: 600px;
	min-height: 225px;
	background: rgb(255, 255, 255);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	height: auto;

	&::before {
		content: '';
		position: absolute;
		top: -20px;
		left: 0;
		width: 100%;
		height: 24px;
		background: linear-gradient(-135deg, rgb(255, 255, 255) 12px, transparent 0%),
			linear-gradient(135deg, rgb(255, 255, 255) 12px, transparent 0%);
		background-size: 24px;
		transform: rotate(180deg);
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -20px;
		left: 0;
		width: 100%;
		height: 24px;
		background: linear-gradient(-45deg, rgb(255, 255, 255) 12px, transparent 0%),
			linear-gradient(45deg, rgb(255, 255, 255) 12px, transparent 0%);
		background-size: 24px;
		transform: rotate(180deg);
	}

	@media (max-width: 920px) {
		min-width: 85vw;
		min-height: 400px;
		flex-wrap: wrap;
	}
`;

const ContenedorDatosOrden = styled.article`
	width: calc(60% - 20px);
	height: 90%;
	display: flex;
	align-items: start;
	justify-content: center;
	margin-left: 20px;
	flex-direction: column;

	@media (max-width: 800px) {
		width: 90%;
		margin-left: 0px;
		height: auto;
	}
`;

const ContenedorDatos = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	width: 100%;
	height: auto;
`;

const ContenedorAccionesOrden = styled.article`
	width: 20%;
	height: 100%;
	margin-right: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;

	& > button {
		width: 120px;
		height: 40px;
		color: rgb(255, 255, 255);
		background: rgb(205, 0, 0);
		border: none;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 550;
		cursor: pointer;
		text-transform: uppercase;
	}

	@media (max-width: 800px) {
		width: 90%;
		height: auto;
		margin-right: 0px;
		flex-direction: row;
	}
`;

const DatosOrden = styled.span`
	font-size: ${(props) => {
		if (props.$datos) {
			return '20px';
		} else {
			return '18px';
		}
	}};
	font-weight: ${(props) => {
		if (props.$datos) {
			return '550';
		} else {
			return '400';
		}
	}};
	color: ${(props) => {
		if (props.$estado) {
			return 'rgb(197, 197, 197)';
		} else {
			return 'rgb(15, 13, 51)';
		}
	}};
`;

const AccionOrden = styled.a`
	width: 120px;
	height: 40px;
	color: rgb(255, 255, 255);
	background: ${(props) => {
		if (props.$cancelar) {
			return 'rgb(199, 0, 0)';
		} else if (props.$editar) {
			return 'rgb(0, 193, 157)';
		} else if (props.$ver) {
			return 'rgb(0, 114, 201)';
		} else {
			return 'rgb(18, 211, 0)';
		}
	}};
	border: none;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 15px;
	font-weight: 550;
	cursor: pointer;
	text-transform: uppercase;
	text-decoration: none;
`;

const NumeroOrden = styled.span`
	width: calc(15%);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: rgb(233, 233, 233);
	font-size: 60px;
	font-weight: 600;

	@media (max-width: 800px) {
		width: 90%;
		margin-left: 0px;
		font-size: 40px;
		height: auto;
		justify-content: center;
	}
`;

export {
	ContenedorOrdenes,
	ContenedorOrden,
	ContenedorDatosOrden,
	ContenedorAccionesOrden,
	ContenedorDatos,
	DatosOrden,
	AccionOrden,
	NumeroOrden,
};
