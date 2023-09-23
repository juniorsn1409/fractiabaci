import { useRef, useState } from 'react'
import Artefato from '../Artefato'
import CasaDecimal from '../CasaDecimal'

export default function Main() {
  const mainContentRef = useRef(null)

  const [artefatosCentena, setArtefatosCentena] = useState<string[]>([])
  const [artefatosDezena, setArtefatosDezena] = useState<string[]>([])
  const [artefatosUnidade, setArtefatosUnidade] = useState<string[]>([])

  const [qtdUnidade, setQtdUnidade] = useState(0)
  const [qtdDezena, setQtdDezena] = useState(0)
  const [qtdCentena, setQtdCentena] = useState(0)

  const adicionarArtefatoCentena = () => {
    if (artefatosCentena.length < 9) {
      const novoArtefatoId = Date.now().toString()
      setArtefatosCentena([...artefatosCentena, novoArtefatoId])
    }
  }

  const adicionarArtefatoDezena = () => {
    if (artefatosDezena.length < 9) {
      const novoArtefatoId = Date.now().toString()
      setArtefatosDezena([...artefatosDezena, novoArtefatoId])
    }
  }

  const adicionarArtefatoUnidade = () => {
    if (artefatosUnidade.length < 9) {
      const novoArtefatoId = Date.now().toString()
      setArtefatosUnidade([...artefatosUnidade, novoArtefatoId])
    }
  }

  return (
    <>
      <div id="mainContent" ref={mainContentRef}>
        <CasaDecimal tipo="centena" artefatos={qtdCentena} />
        <CasaDecimal tipo="dezena" artefatos={qtdDezena} />
        <CasaDecimal tipo="unidade" artefatos={qtdUnidade} />

        <div className="AreaDoArtefato">
          <div className="qualdrado primeiro">
            {artefatosUnidade.map((artefatoId) => (
              <Artefato
                key={artefatoId}
                tipo={'unidade'}
                refExterna={mainContentRef}
                setQtdArtefato={setQtdUnidade}
                qtdArtefato={qtdUnidade}
              />
            ))}
          </div>
          <div className="qualdrado segundo">
            {artefatosDezena.map((artefatoId) => (
              <Artefato
                key={artefatoId}
                tipo={'dezena'}
                refExterna={mainContentRef}
                setQtdArtefato={setQtdDezena}
                qtdArtefato={qtdDezena}
              />
            ))}
          </div>
          <div className="qualdrado terceiro">
            {artefatosCentena.map((artefatoId) => (
              <Artefato
                key={artefatoId}
                tipo={'centena'}
                refExterna={mainContentRef}
                setQtdArtefato={setQtdCentena}
                qtdArtefato={qtdCentena}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={adicionarArtefatoCentena}>
        Adicionar Artefato Centena
      </button>
      <button onClick={adicionarArtefatoDezena}>
        Adicionar Artefato Dezena
      </button>
      <button onClick={adicionarArtefatoUnidade}>
        Adicionar Artefato Unidade
      </button>
    </>
  )
}
