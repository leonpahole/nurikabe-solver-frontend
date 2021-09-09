import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { sendDataToAlgorithm } from "../api";
import NurikabeEditor from "../components/grid/NurikabeEditor";
import Loading from "../components/Loading";
import { LS_EDIT_BEFORE_SENDING_GRID_KEY, LS_SOLUTION_KEY } from "../constants";
import PacmanLoader from "react-spinners/PacmanLoader";

interface Dimension {
  rows: string;
  cols: string;
}

const Editor: React.FC<{}> = () => {
  const history = useHistory();

  const [dimension, setDimension] = useState<Dimension>({
    rows: "5",
    cols: "5",
  });
  const [grid, setGrid] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [loadingSolution, setLoadingSolution] = useState<boolean>(false);

  useEffect(() => {
    if (!history) {
      return;
    }

    const gridStr = localStorage.getItem(LS_EDIT_BEFORE_SENDING_GRID_KEY);
    if (!gridStr) {
      setGrid(
        Array.from({ length: Number(dimension.rows) }, () => {
          return Array.from({ length: Number(dimension.cols) }, () => {
            return 0;
          });
        })
      );
      setLoading(false);
      return;
    }

    try {
      const grid = JSON.parse(gridStr);
      setGrid(grid);
      setDimension({ rows: grid.length, cols: grid[0].length });
      setLoading(false);
    } catch (e) {
      history.push("/");
    }
  }, [history]);

  const onGridChange = (r: number, c: number, val: number) => {
    const newGrid: number[][] = [];
    let rI = 0;
    for (let row of grid) {
      const newRow = [...row];
      if (rI === r) {
        newRow[c] = val;
      }

      newGrid.push(newRow);
      rI++;
    }

    localStorage.setItem(
      LS_EDIT_BEFORE_SENDING_GRID_KEY,
      JSON.stringify(newGrid)
    );

    setGrid(newGrid);
  };

  const onDiscardClick = () => {
    localStorage.removeItem(LS_EDIT_BEFORE_SENDING_GRID_KEY);
    history.push("/");
  };

  const onSendClick = async () => {
    setLoadingSolution(true);

    try {
      const solutionData = await sendDataToAlgorithm(grid);
      localStorage.setItem(LS_SOLUTION_KEY, JSON.stringify(solutionData));
      history.push("/solution");
    } catch (e) {
      toast.error("An error occured while solving the riddle!");
    }

    setLoadingSolution(false);
  };

  const onDimensionChange = (val: string, dim: number) => {
    if (dim === 0) {
      setDimension({ ...dimension, rows: val });
    } else {
      setDimension({ ...dimension, cols: val });
    }
  };

  const onApplyDimensionsClick = () => {
    const parsedRows = Number(dimension.rows);
    if (isNaN(parsedRows) || !parsedRows || parsedRows < 1 || parsedRows > 20) {
      toast.error(
        "Please enter rows as a number greater than 0 and not more than 20!"
      );
      return;
    }

    const parsedCols = Number(dimension.cols);
    if (isNaN(parsedCols) || !parsedCols || parsedCols < 1 || parsedCols > 20) {
      toast.error(
        "Please enter cols as a number greater than 0 and not more than 20!"
      );
      return;
    }

    const newGrid: number[][] = [];

    for (let ri = 0; ri < parsedRows; ri++) {
      if (ri >= grid.length) {
        newGrid.push(Array.from({ length: Number(parsedCols) }, () => 0));
        continue;
      }

      const newRow: number[] = [];

      for (let ci = 0; ci < parsedCols; ci++) {
        if (ci >= grid[ri].length) {
          newRow.push(0);
        } else {
          newRow.push(grid[ri][ci]);
        }
      }

      newGrid.push(newRow);
    }

    setGrid(newGrid);
    localStorage.setItem(
      LS_EDIT_BEFORE_SENDING_GRID_KEY,
      JSON.stringify(newGrid)
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-6xl">Editor</h1>
      <p className="text-xl mt-2">Instructions:</p>
      <ul className="list-disc">
        <li>Click on the element to change it's number.</li>
        <li>Right click on element to remove the number.</li>
        <li>Press "SEND" when ready.</li>
      </ul>

      <div className="flex mt-4 items-end">
        <div className="flex flex-col mr-3">
          <label className="mb-2 text-grey-darkest">Rows</label>
          <input
            className="border py-2 px-3 text-grey-darkest"
            type="number"
            value={dimension.rows}
            onChange={(e) => onDimensionChange(e.target.value, 0)}
          />
        </div>
        <div className="flex flex-col ml-3">
          <label className="mb-2 text-grey-darkest">Columns</label>
          <input
            className="border py-2 px-3 text-grey-darkest"
            type="number"
            value={dimension.cols}
            onChange={(e) => onDimensionChange(e.target.value, 1)}
          />
        </div>
        <div className="flex flex-col ml-3">
          <button
            onClick={onApplyDimensionsClick}
            className="inline-block mr-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-blue-700 rounded"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="mt-6">
        <NurikabeEditor grid={grid} onChange={onGridChange} />
      </div>

      <div className="flex mt-4 mb-5">
        {loadingSolution ? (
          <PacmanLoader />
        ) : (
          <>
            <button
              onClick={onSendClick}
              className="inline-block mr-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-blue-700 rounded"
            >
              SEND
            </button>
            <button
              onClick={onDiscardClick}
              className="inline-block ml-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-yellow-700 rounded"
            >
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
