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
  const [artefatos, setArtefatos] = useState<string[]>([]); // Defina o tipo como string[]

  const [qtdUnidade, setQtdUnidade] = useState(0);
  const [qtdDezena, setQtdDezena] = useState(0);
  const [qtdCentena, setQtdCentena] = useState(0);

  const adicionarArtefato = () => {
    const novoArtefatoId = Date.now().toString();
    setArtefatos([...artefatos, novoArtefatoId]);
  };

  return (
    <>
      <MainContent ref={mainContentRef}>
        <CasaDecimal tipo='centena' artefatos={qtdCentena} />
        <CasaDecimal tipo='dezena' artefatos={qtdDezena} />
        <CasaDecimal tipo='unidade' artefatos={qtdUnidade} />

        {artefatos.map((artefatoId) => (
          <Artefato
            key={artefatoId}
            tipo={'unidade'}
            refExterna={mainContentRef}
            setQtdArtefato={setQtdUnidade}
            qtdArtefato={qtdUnidade}
          />
        ))}
      </MainContent>
      <button onClick={adicionarArtefato}>Adicionar Artefato</button>
    </>
  );
}
