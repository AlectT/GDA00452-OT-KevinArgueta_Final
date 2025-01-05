import styled from 'styled-components';

const ContenedorProductos = styled.section`
	width: 90%;
	min-height: calc(100% - 50px);
	max-height: auto;
	display: flex;
	flex-direction: row;
	align-items: start;
	justify-content: center;
	flex-wrap: wrap;
	gap: 50px;
	background: transparent;
	margin-top: 30px;
	padding-bottom: 50px;

	@media (max-width: 800px) {
		width: 100%;
		gap: 30px;
	}
`;

const ContenedorProducto = styled.article`
	width: 20%;
	min-width: 250px;
	max-width: 270px;
	height: 350px;
	background: rgb(12, 7, 46);
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #ffffff;
	position: relative;

	@media (max-width: 800px) {
		min-width: 200px;
		height: 300px;
	}
`;

const EtiquetaNuevo = styled.span`
	position: absolute;
	top: -10px;
	left: -10px;
	width: 150px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	z-index: 2;

	@media (max-width: 800px) {
		width: 125px;
		height: 125px;
	}

	&::before {
		content: '¡Nuevo!';
		position: absolute;
		width: 150%;
		height: 40px;
		background: rgb(11, 223, 0);
		transform: rotate(-45deg) translateY(-20px);
		display: flex;
		font-size: 18px;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: uppercase;
		font-weight: 650;
		color: #fff;
		letter-spacing: 1px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

		@media (max-width: 800px) {
			font-size: 13px;
		}
	}

	&::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		bottom: 0;
		left: 0;
		z-index: -1;
		background: rgb(0, 149, 7);
		box-shadow: 140px -140px rgb(0, 149, 7);

		@media (max-width: 800px) {
			box-shadow: 115px -115px rgb(0, 149, 7);
		}
	}
`;

const EtiquetaPocasUnidades = styled.span`
	position: absolute;
	top: -10px;
	left: -10px;
	width: 150px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	z-index: 2;

	@media (max-width: 800px) {
		width: 125px;
		height: 125px;
	}

	&::before {
		content: '¡Pocas unidades!';
		position: absolute;
		width: 150%;
		height: 40px;
		background: rgb(225, 191, 0);
		transform: rotate(-45deg) translateY(-20px);
		display: flex;
		font-size: 15px;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: uppercase;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

		@media (max-width: 800px) {
			font-size: 11px;
		}
	}

	&::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		bottom: 0;
		left: 0;
		z-index: -1;
		background: rgb(149, 97, 0);
		box-shadow: 140px -140px rgb(149, 97, 0);

		@media (max-width: 800px) {
			box-shadow: 115px -115px rgb(149, 97, 0);
		}
	}
`;

const EtiquetaAgotado = styled.span`
	position: absolute;
	top: -10px;
	left: -10px;
	width: 150px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	z-index: 2;

	@media (max-width: 800px) {
		width: 125px;
		height: 125px;
	}

	&::before {
		content: '¡Agotado!';
		position: absolute;
		width: 150%;
		height: 40px;
		background: rgb(255, 0, 0);
		transform: rotate(-45deg) translateY(-20px);
		display: flex;
		font-size: 15px;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: uppercase;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

		@media (max-width: 800px) {
			font-size: 14px;
		}
	}

	&::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		bottom: 0;
		left: 0;
		z-index: -1;
		background: rgb(149, 0, 0);
		box-shadow: 140px -140px rgb(149, 0, 0);

		@media (max-width: 800px) {
			box-shadow: 115px -115px rgb(149, 0, 0);
		}
	}
`;

const EtiquetaNoDisponible = styled.span`
	position: absolute;
	top: -10px;
	left: -10px;
	width: 150px;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	z-index: 2;

	@media (max-width: 800px) {
		width: 125px;
		height: 125px;
	}

	&::before {
		content: '¡No Disponible!';
		position: absolute;
		width: 150%;
		height: 40px;
		background: rgb(255, 0, 0);
		transform: rotate(-45deg) translateY(-20px);
		display: flex;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: uppercase;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

		@media (max-width: 800px) {
			font-size: 12px;
		}
	}

	&::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		bottom: 0;
		left: 0;
		z-index: -1;
		background: rgb(149, 0, 0);
		box-shadow: 140px -140px rgb(149, 0, 0);

		@media (max-width: 800px) {
			box-shadow: 115px -115px rgb(149, 0, 0);
		}
	}
`;

const ContenedorImagen = styled.div`
	width: 88%;
	height: 50%;
	background: #ffffff;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	object-fit: cover;

	@media (max-width: 800px) {
		width: 88%;
		height: 45%;
	}
`;

const ImagenProducto = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;

	@media (max-width: 800px) {
		width: 85%;
		height: 85%;
	}
`;

const ContenedorDetallesProductos = styled.div`
	height: 42%;
	width: 88%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 18px;
	flex-direction: column;
`;

const NombreProducto = styled.h3`
	font-size: 17px;
	font-weight: 550;
	color: #ffffff;
	text-align: center;
	width: 100%;
	height: auto;
	text-transform: capitalize;
`;

const PrecioProducto = styled.span`
	font-size: 16px;
	letter-spacing: 1px;
	color: #ffffff;
	text-align: center;
	width: 100%;
	height: auto;
`;

const ContenedorBotonesProductos = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
`;

const BotonDetalles = styled.a`
	width: calc(80% - 6px);
	height: 100%;
	display: flex;
	text-decoration: none;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 18px;
	color: #ffffff;
	background: rgb(0, 132, 149);
	text-transform: uppercase;
	font-weight: 600;
	border-radius: 8px;
	transition: 0.5s ease all;
	cursor: pointer;

	&:hover {
		background: rgb(0, 180, 183);
	}

	@media (max-width: 800px) {
		font-size: 16px;
	}
`;

const BotonVerMasTarde = styled.button`
	width: calc(20% - 6px);
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background: rgb(0, 132, 149);
	border-radius: 8px;
	transition: 0.5s ease all;
	cursor: pointer;
	border: none;

	& > svg {
		transition: 0.5s ease all;
		width: 15px;
		height: 15px;
		color: ${(props) => {
			if (props.$guardado) {
				return 'rgb(255,255,255)';
			} else {
				return 'rgba(255, 255, 255, 0.5)';
			}
		}};
	}
`;

const NoProductos = styled.span`
	width: 100%;
	height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 60px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(255, 255, 255, 0.3);
	text-align: center;
	word-wrap: wrap;

	@media (max-width: 800px) {
		width: 75%;
		font-size: 35px;
	}
`;

export {
	ContenedorProductos,
	ContenedorProducto,
	EtiquetaNuevo,
	EtiquetaPocasUnidades,
	EtiquetaAgotado,
	EtiquetaNoDisponible,
	ContenedorImagen,
	ContenedorDetallesProductos,
	ImagenProducto,
	NombreProducto,
	PrecioProducto,
	ContenedorBotonesProductos,
	BotonVerMasTarde,
	BotonDetalles,
	NoProductos,
};
