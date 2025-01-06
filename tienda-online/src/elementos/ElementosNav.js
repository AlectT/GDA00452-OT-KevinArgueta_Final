import styled from 'styled-components';

const Nav = styled.nav`
	width: 100vw;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
`;

const ContenedorElementosNav = styled.div`
	width: 92%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: transparent;
	overflow: hidden;
	position: relative;
`;

const LinkInicio = styled.a`
	width: 225px;
	height: 80px;
	cursor: pointer;
	text-decoration: none;
	text-transform: none;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Logo = styled.img`
	width: 225px;
	height: 100%;
	object-fit: cover;

	@media (max-width: 800px) {
		width: 150px;
		height: 80%;
	}
`;

const GrupoIconos = styled.div`
	min-width: 250px;
	height: 50px;
	display: flex;
	align-items: start;
	justify-content: flex-end;
	gap: 25px;
`;

const IconosNav = styled.div`
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	& > svg {
		color: rgb(28, 24, 57);
		width: 30px;
		height: 30px;
		transition: 0.5s ease all;
	}

	&:hover > svg {
		transition: 0.5s ease all;
		transform: scale(1.1);
	}
`;

const IconoCarrito = styled.a`
	width: 50px;
	height: 50px;
	display: ${(props) => {
		if (props.$buscar) {
			return 'none';
		} else {
			return 'flex';
		}
	}};
	align-items: center;
	justify-content: center;
	cursor: pointer;
	text-decoration: none;

	& > svg {
		color: rgb(28, 24, 57);
		width: 30px;
		height: 30px;
		transition: 0.5s ease all;
	}

	&:hover > svg {
		transition: 0.5s ease all;
		transform: scale(1.1);
	}
`;

const ContenedorBuscarProducto = styled.form`
	min-width: 200px;
	height: 50px;
	background: rgb(255, 255, 255);
	border: none;
	border-radius: 8px;
	border: 2px solid rgb(16, 14, 55);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0px 10px;

	@media (max-width: 800px) {
		min-width: 50px;
		width: 150px;
	}

	& > input {
		width: 80%;
		height: 100%;
		border: none;
		color: rgb(16, 14, 55);
		font-size: 15px;
		outline: none;
		background: rgb(255, 255, 255);
		text-indent: 5px;

		@media (max-width: 800px) {
			width: 100%;
			font-size: 12px;
		}
	}

	& > button {
		cursor: pointer;
		border: none;
		background: transparent;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgb(16, 14, 55);

		@media (max-width: 800px) {
			width: 15px;
			height: 15px;
		}
	}

	& > button > svg {
		width: 20px;
		height: 20px;

		@media (max-width: 800px) {
			width: 15px;
			height: 15px;
		}
	}
`;

export {
	Nav,
	Logo,
	IconosNav,
	GrupoIconos,
	LinkInicio,
	ContenedorElementosNav,
	IconoCarrito,
	ContenedorBuscarProducto,
};
