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

// Novo contêiner para os Artefatos com posicionamento absoluto
const ArtefatosContainer = styled.div`
  position: absolute;
`;

export default function Main() {
  const mainContentRef = useRef(null);

  const [artefatos, setArtefatos] = useState<JSX.Element[]>([]);
  const adicionarArtefato = () => {
    setArtefatos([...artefatos, <Artefato refExterna={mainContentRef} />]);
  };

  return (
    <MainContent ref={mainContentRef}>
      <CasaDecimal texto={"unidade"} numero={"9"} />
      {/* Renderize os Artefatos dentro do novo contêiner */}
      <ArtefatosContainer>
        {artefatos.map((artefato, index) => (
          <div key={index}>{artefato}</div>
        ))}
      </ArtefatosContainer>
      <button onClick={adicionarArtefato}>Adicionar Artefato</button>
    </MainContent>
  );
}
