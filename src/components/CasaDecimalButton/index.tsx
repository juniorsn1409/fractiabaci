interface CasaDecimalButtonProps {
  onClick: () => void;
  label: string;
}

export default function CasaDecimalButton({
  onClick,
  label,
}: CasaDecimalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
}
