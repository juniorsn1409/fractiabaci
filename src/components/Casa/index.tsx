import { useState } from "react";
import { InteractiveObject } from "../InteractiveObject";

interface CasaProps {
  color?: string;
  textColor?: string;
}

export function Casa({ color, textColor }: CasaProps) {
  const [objects, setObjects] = useState<Array<number[]>>([[], [], []]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const addObject = (index: number) => {
    setObjects((prevObjects) => {
      const newObjects = [...prevObjects];
      newObjects[index].push(newObjects[index].length + 1);

      if (newObjects[index].length === 10) {
        newObjects[index] = [];
        newObjects[index].push(1);
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 5000);
      }

      return newObjects;
    });
  };

  return (
    <div
      className={`w-full h-screen text-${textColor} bg-${color} p-12 relative flex items-center justify-center`}
    >
      {/* First Decimal House (Centena) */}
      <div className={`w-1/4 h-3/4 relative border border-green-600 rounded-md ${shouldAnimate ? "animate-gather" : ""}`}>
        {objects[0].map((objIndex) => (
          <InteractiveObject key={objIndex} color="#00D000" parentWidth={250} parentHeight={370} />
        ))}
        <button
          className="absolute inset-1/4 w-1/2 h-12 flex items-center justify-center bg-opacity-50 bg-gray-800 text-white font-bold text-lg rounded-md"
          onClick={() => addObject(0)}
        >
          Add Object
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 text-white text-center rounded-b-md">
          Count: {objects[0].length}
        </div>
      </div>

      {/* Second Decimal House (Dezena) */}
      <div className={`w-1/4 h-3/4 relative border border-orange-600 rounded-md ${shouldAnimate ? "animate-gather" : ""}`}>
        {objects[1].map((objIndex) => (
          <InteractiveObject key={objIndex} color="#FFD000" parentWidth={250} parentHeight={370} />
        ))}
        <button
          className="absolute inset-1/4 w-1/2 h-12 flex items-center justify-center bg-opacity-50 bg-gray-800 text-white font-bold text-lg rounded-md"
          onClick={() => addObject(1)}
        >
          Add Object
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 text-white text-center rounded-b-md">
          Count: {objects[1].length}
        </div>
      </div>

      {/* Third Decimal House (Unidade) */}
      <div className={`w-1/4 h-3/4 relative border border-blue-600 rounded-md ${shouldAnimate ? "animate-gather" : ""}`}>
        {objects[2].map((objIndex) => (
          <InteractiveObject key={objIndex} color="#183EFF" parentWidth={250} parentHeight={370} />
        ))}
        <button
          className="absolute inset-1/4 w-1/2 h-12 flex items-center justify-center bg-opacity-50 bg-gray-800 text-white font-bold text-lg rounded-md"
          onClick={() => addObject(2)}
        >
          Add Object
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 text-white text-center rounded-b-md">
          Count: {objects[2].length}
        </div>
      </div>
    </div>
  );
}
