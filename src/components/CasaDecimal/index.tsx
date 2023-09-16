import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface CasaDecimalProps {
  texto: string;
  numero: string;
}

const Casa = styled.div`
  width: 50%;
  height: 90%;
  margin: auto;
  border-radius: 8px;
  transition: background-color 0.3s;
  background-color: var(--braco-isabeline);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Numero = styled.h1`
  font-size: 100px;
  margin-bottom: 16px;
  transition: 0.5s;
`;

const Titulo = styled.span`
  font-size: 25px;
`

export default function CasaDecimal({ texto, numero }: CasaDecimalProps) {
  // Usar estado local para controlar o número exibido
  const [numeroExibido, setNumeroExibido] = useState(numero);

  // Use useEffect para atualizar o número exibido sempre que a prop 'numero' mudar
  useEffect(() => {
    setNumeroExibido(numero);
  }, [numero]);

  return (
    <Casa>
      <Numero>{numeroExibido}</Numero>
      <Titulo>{texto}</Titulo>
    </Casa>
  );
}
