import React from "react";
import { useHistory } from "react-router-dom";

const StartFromScratch: React.FC<{}> = () => {
  const history = useHistory();

  const onToEditorClick = () => {
    history.push("/editor");
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-4xl">Start from scratch</h4>
      <p>Use interactive editor to create a problem.</p>

      <button
        onClick={onToEditorClick}
        className="mt-3 inline-block mr-2 px-6 py-2 text-xs font-medium leading-6 text-center text-white bg-blue-700 rounded"
      >
        To editor
      </button>
    </div>
  );
};

export default StartFromScratch;
