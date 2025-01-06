import styled from 'styled-components';

const ContenedorFormulario = styled.form`
	width: 28vw;
	min-width: 400px;
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	gap: 30px;
	background: rgba(255, 255, 255, 1);
	border-radius: 15px;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2), -2px -2px 5px rgba(0, 0, 0, 0.2);
	z-index: 2;
`;

const ContenedorLabel = styled.div`
	width: 75%;
	height: 65px;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;

	@media (max-width: 800px) {
		width: 90%;
	}
`;

const Label = styled.label`
	width: 100%;
	height: 40px;
	min-height: 30px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-size: 18;
	font-weight: 600;
`;

const Span = styled.span`
	width: 30%;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: rgb(28, 24, 57);
`;

const SpanError = styled.span`
	width: 50%;
	height: 20px;
	text-align: start;
	margin-left: 50px;
	font-size: 12px;
	font-weight: 550;
	color: rgb(222, 1, 1);
`;

const ContenedorInput = styled.div`
	width: 70%;
	height: 35px;
	color: rgb(28, 24, 57);
	border-radius: 5px;
	border: ${(props) => {
		if (props.$error) {
			return '2px solid rgb(222, 1, 1)';
		} else {
			return '2px solid rgb(28, 24, 57)';
		}
	}};
	display: flex;
	align-items: center;
	justify-content: start;
`;

const InputText = styled.input`
	padding-left: 10px;
	outline: none;
	background: transparent;
	height: 35px;
	width: 85%;
	border: none;
`;

const IconoInput = styled.div`
	width: 15%;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	& > svg {
		color: rgb(189, 189, 189);
		width: 15px;
		height: 15px;
		transition: 0.5s ease all;
	}

	&:hover > svg {
		transition: 0.5s ease all;
		transform: scale(1.1);
	}
`;

const LogoFormulario = styled.div`
	margin-top: 70px;
	padding-bottom: 5px;

	& > img {
		width: 275px;
		height: 100px;
		object-fit: cover;
	}
`;

const BotonFormulario = styled.button`
	width: 40%;
	height: 40px;
	text-align: center;
	font-size: 16px;
	border: none;
	border-radius: 12px;
	color: rgb(250, 250, 250);
	background: linear-gradient(160deg, rgb(56, 50, 106), rgb(77, 65, 160), rgb(41, 77, 169));
	cursor: pointer;
	font-weight: 550;
	letter-spacing: 1px;
	transition: 0.5s ease all;

	&:hover {
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.15), -1px -1px 10px 1px rgba(0, 0, 0, 0.15);
	}
`;

export {
	ContenedorFormulario,
	ContenedorLabel,
	Label,
	InputText,
	Span,
	SpanError,
	LogoFormulario,
	ContenedorInput,
	IconoInput,
	BotonFormulario,
};
