import React from "react";
import { useHistory } from "react-router-dom";
import { LS_EDIT_BEFORE_SENDING_GRID_KEY } from "../../constants";

const templateSmall = [
  [0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0],
];

const templateMedium = [
  [0, 0, 0, 0, 2, 0, 0, 0, 4, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0],
  [2, 0, 0, 5, 0, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 4, 0, 4, 0, 3],
];

const templateBig = [
  [0, 0, 2, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 1, 0, 0, 0, 5],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 13, 0, 0],
  [2, 0, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 11, 0, 0, 0, 0, 5],
  [0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
  [2, 0, 4, 0, 0, 0, 0, 4, 0, 0],
];

const templateBigSecond = [
  [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
  [5, 0, 0, 4, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 1, 0],
  [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 2],
  [3, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [4, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 3],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0, 3],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 3, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 2, 0, 0, 2],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
];

const UseTemplates: React.FC<{}> = () => {
  const history = useHistory();

  const pickTemplate = (id: number) => {
    let template = templateSmall;
    if (id === 1) {
      template = templateMedium;
    } else if (id === 2) {
      template = templateBig;
    } else if (id === 3) {
      template = templateBigSecond;
    }

    localStorage.setItem(
      LS_EDIT_BEFORE_SENDING_GRID_KEY,
      JSON.stringify(template)
    );
    history.push("/editor");
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-4xl">Use one of the templates</h4>
      <p>Pick one of ready-made templates to test the algorithm.</p>

      <div className="flex mt-3">
        <button
          onClick={() => pickTemplate(0)}
          className="inline-block mr-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-red-400 rounded"
        >
          Small (5x5)
        </button>
        <button
          onClick={() => pickTemplate(1)}
          className="inline-block ml-2 mr-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-red-600 rounded"
        >
          Medium (10x10)
        </button>
        <button
          onClick={() => pickTemplate(2)}
          className="inline-block ml-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-red-700 rounded"
        >
          Big (18x10)
        </button>
        <button
          onClick={() => pickTemplate(3)}
          className="inline-block ml-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-red-700 rounded"
        >
          Big (18x10)
        </button>
      </div>
    </div>
  );
};

export default UseTemplates;
