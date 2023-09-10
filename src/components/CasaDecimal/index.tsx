import { useState } from "react";
import CasaDecimalButton from "./../CasaDecimalButton"; // Novo componente para os botões de incremento e decremento

interface CasaDecimalProps {
  unidadeColor: string;
  dezenaColor: string;
  centenaColor: string;
}

export default function CasaDecimal({
  unidadeColor,
  dezenaColor,
  centenaColor,
}: CasaDecimalProps) {
  const [unidade, setUnidade] = useState(0);
  const [dezena, setDezena] = useState(0);
  const [centena, setCentena] = useState(0);

  const handleIncrement = (value: string) => {
    switch (value) {
      case "unidade":
        if (unidade < 9) {
          setUnidade((prev) => prev + 1);
        } else if (dezena < 9) {
          setUnidade(0);
          setDezena((prev) => prev + 1);
        }
        break;
      case "dezena":
        if (dezena < 9) {
          setDezena((prev) => prev + 1);
        } else if (centena < 9) {
          setDezena(0);
          setCentena((prev) => prev + 1);
        }
        break;
      case "centena":
        if (centena < 9) {
          setCentena((prev) => prev + 1);
        }
        break;
      default:
        break;
    }
  };

  const handleDecrement = (value: string) => {
    switch (value) {
      case "unidade":
        if (unidade > 0) {
          setUnidade((prev) => prev - 1);
        }
        break;
      case "dezena":
        if (dezena > 0) {
          setDezena((prev) => prev - 1);
        }
        break;
      case "centena":
        if (centena > 0) {
          setCentena((prev) => prev - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setUnidade(0);
    setDezena(0);
    setCentena(0);
  };

  return (
    <div className="casa-decimal">
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
      <div className="centena" style={{ backgroundColor: centenaColor }}>
        {centena}
        <CasaDecimalButton
          onClick={() => handleIncrement("centena")}
          label="+1"
        />
        <CasaDecimalButton
          onClick={() => handleDecrement("centena")}
          label="-1"
        />
      </div>
      <div className="dezena" style={{ backgroundColor: dezenaColor }}>
        {dezena}
        <CasaDecimalButton
          onClick={() => handleIncrement("dezena")}
          label="+1"
        />
        <CasaDecimalButton
          onClick={() => handleDecrement("dezena")}
          label="-1"
        />
      </div>
      <div className="unidade" style={{ backgroundColor: unidadeColor }}>
        {unidade}
        <CasaDecimalButton
          onClick={() => handleIncrement("unidade")}
          label="+1"
        />
        <CasaDecimalButton
          onClick={() => handleDecrement("unidade")}
          label="-1"
        />
      </div>
    </div>
  );
}
