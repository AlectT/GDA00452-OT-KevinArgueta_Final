import styled from 'styled-components';

const ContenedorGlobal = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	background: linear-gradient(160deg, rgb(28, 24, 57), rgb(77, 65, 160), rgb(41, 77, 169));
	position: relative;
	overflow: hidden;
`;

const CubosDecorativos = styled.span`
	width: 400px;
	height: 400px;
	background: ${(props) => {
		if (props.$cubo === 3) {
			return 'rgba(255, 255, 255, 0.04)';
		} else if (props.$cubo === 2) {
			return 'rgba(255, 255, 255, 0.05)';
		} else if (props.$cubo === 1) {
			return 'rgba(255, 255, 255, 0.06)';
		} else if (props.$cubo === 4) {
			return 'rgba(255, 255, 255, 0.05)';
		}
	}};
	border-radius: 15px;
	position: absolute;
	transform: ${(props) => {
		if (props.$cubo === 1) {
			return 'translate(-25%, -70%) rotate(60deg)';
		} else if (props.$cubo === 2) {
			return 'translate(75%, 85%) rotate(60deg)';
		} else if (props.$cubo === 3) {
			return 'translate(330%, 60%) rotate(60deg)';
		} else if (props.$cubo === 4) {
			return 'translate(250%, -80%) rotate(60deg)';
		}
	}};
	z-index: 1;
	left: 0;

	@media (max-width: 800px) {
		transform: ${(props) => {
			if (props.$cubo === 1) {
				return 'translate(-65%, -90%) rotate(50deg)';
			} else if (props.$cubo === 2) {
				return 'translate(75%, 85%) rotate(60deg)';
			} else if (props.$cubo === 3) {
				return 'translate(330%, 60%) rotate(60deg)';
			} else if (props.$cubo === 4) {
				return 'translate(250%, -80%) rotate(60deg)';
			}
		}};
	}
`;

const ContenedorPagina = styled.section`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	background: transparent;
	z-index: 2;
`;

const ContenedorMain = styled.main`
	width: 100vw;
	height: calc(100vh - 80px);
	display: flex;
	justify-content: center;
	align-items: ${(props) => {
		if (props.$maquetar === 'tienda') {
			return 'start';
		} else {
			return 'center';
		}
	}};
	gap: ${(props) => {
		if (props.$maquetar === 'tienda') {
			return '0px';
		} else if (props.$maquetar === 'producto') {
			return '50px';
		}
	}};
	overflow-x: hidden;
	overflow-y: auto;

	@media (max-width: 800px) {
		flex-direction: ${(props) => {
			if (props.$maquetar === 'producto') {
				return 'column';
			}
		}};
		gap: ${(props) => {
			if (props.$maquetar === 'producto') {
				return '0px';
			}
		}};
		padding-top: ${(props) => {
			if (props.$maquetar === 'producto') {
				return '30px';
			}
		}};
		justify-content: ${(props) => {
			if (props.$maquetar === 'producto') {
				return 'flex-start';
			}
		}};
	}
`;

export { ContenedorGlobal, CubosDecorativos, ContenedorPagina, ContenedorMain };
