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
  const [qtdArtefato, setQtdArtefato] = useState(0);

  const adicionarArtefato = () => {
    const novoArtefatoId = Date.now().toString();
    setArtefatos([...artefatos, novoArtefatoId]);
  };

  const aumentarNumero = () => {
    setQtdArtefato(qtdArtefato + 1);
  };

  const diminuirNumero = () => {
    setQtdArtefato(qtdArtefato - 1);
  };

  return (
    <MainContent ref={mainContentRef}>
      {/* <CasaDecimal tipo='centena' artefatos={qtdArtefato} />
      <CasaDecimal tipo='dezena' artefatos={qtdArtefato} /> */}
      <CasaDecimal tipo='unidade' artefatos={qtdArtefato} />

      {artefatos.map((artefatoId) => (
        <Artefato
          key={artefatoId}
          refExterna={mainContentRef}
          setQtdArtefato={setQtdArtefato}
          qtdArtefato={qtdArtefato}
        />
      ))}

      <button onClick={adicionarArtefato}>Adicionar Artefato</button>
    </MainContent>
  );
}
