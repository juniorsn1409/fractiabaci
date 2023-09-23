import { motion } from 'framer-motion'

interface CasaDecimalProps {
  tipo: 'unidade' | 'dezena' | 'centena'
  artefatos: number
}

export default function CasaDecimal({ tipo, artefatos }: CasaDecimalProps) {
  return (
    <motion.div
      id={tipo}
      style={{
        width: '25%',
        height: '90%',
        margin: '1%',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        backgroundColor: 'var(--braco-isabeline)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 className="numero">{artefatos}</h1>
      <span className="titulo">{tipo}</span>
    </motion.div>
  )
}
