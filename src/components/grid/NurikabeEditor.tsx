import React from "react";
import { SEA } from "../../api";

interface NurikabeEditorProps {
  grid: number[][];
  onChange?(r: number, c: number, val: number): void;
}

const NurikabeEditor: React.FC<NurikabeEditorProps> = ({ grid, onChange }) => {
  const onLeftClickCol = (r: number, c: number) => {
    if (!onChange) {
      return;
    }

    const result = prompt(
      "Enter value: 0 for empty, positive number for value."
    );
    const numberParsed = Number(result);

    if (isNaN(numberParsed) || !numberParsed) {
      return;
    }

    if (numberParsed < 0) {
      return;
    }

    onChange(r, c, numberParsed);
  };

  const onRightClickCol = (r: number, c: number, e: any) => {
    if (!onChange) {
      return;
    }

    e.preventDefault();
    onChange(r, c, 0);
  };

  return (
    <table className="border-collapse border border-black">
      <tbody>
        {grid.map((row, r) => (
          <tr key={r}>
            {row.map((col, c) => (
              <td
                key={`${r}_${c}`}
                className={`border border-black w-16 h-16 ${
                  col === SEA ? "bg-black" : ""
                }`}
                onClick={() => onLeftClickCol(r, c)}
                onContextMenu={(e) => onRightClickCol(r, c, e)}
              >
                <div className="flex items-center justify-center">
                  <p className="text-4xl">{col > 0 ? col : ""}</p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NurikabeEditor;
