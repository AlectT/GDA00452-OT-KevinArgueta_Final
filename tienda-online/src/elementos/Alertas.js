import { styled } from "styled-components";

const ContenedorAlertas = styled.div`
  width: 100vw;
  height: auto;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

const Alertas = styled.span`
  width: 80%;
  padding: 10px;
  min-height: 45px;
  height: auto;
  font-size: 20px;
  background: ${(props) => {
    if (props.$color === "error") {
      return '#e9183b';
    } else if (props.$color === "exito") {
      return '#3EBB12';
    } else {
      return '#000';
    }
  }};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 9px;

`;

export { ContenedorAlertas, Alertas };