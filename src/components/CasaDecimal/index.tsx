import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface CasaDecimalProps {
  texto: string;
  numero: string;
}

const Casa = styled.div`
  width: 30%;
  height: 70%;
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

  const handleDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Impede o comportamento padrão (não permite que o elemento seja solto aqui)
    // Adicione estilos ou feedback visual aqui, se necessário
  };
  const handleDrop = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Impede o comportamento padrão
    // Aqui você pode acessar o elemento que foi solto usando event.dataTransfer
    // Atualize o estado ou execute a lógica necessária com base no elemento solto
    // Por exemplo, você pode extrair informações do elemento solto e atualizar 'numeroExibido'
  };

  return (
    <Casa onDragOver={handleDragOver} onDrop={handleDrop}>
      <Numero>{numeroExibido}</Numero>
      <Titulo>{texto}</Titulo>
    </Casa>

  );
}
