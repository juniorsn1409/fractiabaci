import { motion } from 'framer-motion'

interface CasaDecimalProps {
  tipo: 'unidade' | 'dezena' | 'centena'
  artefatos: number
}

export default function CasaDecimal({ tipo, artefatos }: CasaDecimalProps) {
  const handleColor = (tipo: string) => {
    switch (tipo) {
      case 'unidade':
        return 'var(--vermelho-ucari)'
        break
      case 'dezena':
        return 'var(--azul-ararinha)'
        break
      case 'centena':
        return 'var(--amarelo-ipe)'
        break
      default:
        return 'var(--braco-isabeline)'
        break
    }
  }

  return (
    <motion.div
      id={tipo}
      style={{
        width: '25%',
        height: '100%',
        margin: '1%',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        backgroundColor: `${handleColor(tipo)}`,
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
