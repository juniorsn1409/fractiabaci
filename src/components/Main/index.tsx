import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import Artefato from '../Artefato';
import CasaDecimal from '../CasaDecimal';

const MainContent = styled.main`
  flex: 2;
  background-color: var(--branco-paz);
  border-radius: 5px;
  overflow: hidden;
  width: 95%;
  height: 500px;
  display: flex;
  flex-direction: row;
  margin: 25px 25px 25px 25px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function Main() {
  const mainContentRef = useRef(null);

  const [artefatos, setArtefatos] = useState<JSX.Element[]>([]);
  const adicionarArtefato = () => {
    // Gerar um ID único para o novo artefato
    const novoArtefatoId = Date.now().toString();

    // Criar um novo elemento Artefato com a chave definida como o ID único
    const novoArtefato = <Artefato key={novoArtefatoId} refExterna={mainContentRef} />;

    const novaListaArtefatos = [novoArtefato, ...artefatos]
    // Adicionar o novo elemento à lista de artefatos
    setArtefatos(novaListaArtefatos);
  };

  return (
    <MainContent ref={mainContentRef}>
      <CasaDecimal texto={"centena"} numero={"0"} />
      <CasaDecimal texto={"dezena"} numero={"0"} />
      <CasaDecimal texto={"unidade"} numero={"0"} />
      {artefatos.map((artefato) => (
        <div key={artefato.key}>{artefato}</div>
      ))}
      <button onClick={adicionarArtefato}>Adicionar Artefato</button>
    </MainContent>
  );
}
