import { motion } from 'framer-motion';
import { styled } from 'styled-components';

interface CasaDecimalProps {
  tipo: 'unidade' | 'dezena' | 'centena';
  artefatos: number;
}

const Numero = styled.h1`
  font-size: 100px;
  margin-bottom: 16px;
  transition: 0.5s;
`;
const Titulo = styled.span`
  font-size: 25px;
`;

export default function CasaDecimal({ tipo, artefatos }: CasaDecimalProps) {
  return (
    <motion.div
      id={tipo} // Atualizado para 'tipo'
      style={{
        width: '30%',
        height: '70%',
        margin: 'auto',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        backgroundColor: 'var(--braco-isabeline)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Numero>{artefatos}</Numero>
      <Titulo>{tipo}</Titulo>
    </motion.div>
  
  );
}
