import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Alerta = ({ color, mensaje, estadoAlerta, cambiarEstadoAlerta }) => {
	useEffect(() => {
		let tiempo;
		if (estadoAlerta === true) {
			tiempo = setTimeout(() => {
				cambiarEstadoAlerta(false);
			}, 5000);
		}

		return () => clearTimeout(tiempo);
	}, [estadoAlerta, cambiarEstadoAlerta]);

	return (
		<>
			{estadoAlerta && (
				<ContenedorAlerta color={color}>
					{color === 'exito' ? <p>{mensaje}</p> : <p>{mensaje}</p>}
				</ContenedorAlerta>
			)}
		</>
	);
};

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); 
        opacity: 0;
    }

    10% {
        transform: translateY(-35px);
        opacity: 1;
    }
    
    90% {
        transform: translateY(-35px);
        opacity: 1;
    }

    100% {
        transform: translateY(-35px);
        opacity: 0;
    }
`;

const ContenedorAlerta = styled.div`
	z-index: 3;
	width: auto;
	left: 40%;
	top: 60px;
	transform: translate(0%, -50%);
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${slideDown} 5s ease forwards;

	p {
		background: ${(props) => {
			if (props.color === 'error') {
				return '#e9183b';
			} else if (props.color === 'exito') {
				return '#3EBB12';
			} else {
				return '#000';
			}
		}};
		color: #fff;
		padding: 10px 30px;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
		text-align: center;
		font-size: 16px;
	}
`;

export default Alerta;
