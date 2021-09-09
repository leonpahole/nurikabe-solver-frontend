import React from "react";
import { readString } from "react-papaparse";
import { toast } from "react-toastify";
import { LS_EDIT_BEFORE_SENDING_GRID_KEY } from "../../constants";
import { validateAndPreprocessDataFromFile } from "../../util/dataUtil";
import { useHistory } from "react-router-dom";

const FileUpload: React.FC<{}> = () => {
  const history = useHistory();

  const handleFileChosen = (file: any) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (e: any) => {
      const str = e.target.result;
      const parsed = readString(str);
      if (
        (parsed.errors && parsed.errors.length > 0) ||
        !parsed ||
        !parsed.data
      ) {
        toast.error(
          "Error while uploading file! Are you sure the file has correct format?"
        );
        return;
      }

      const {
        data: parsedGridData,
        error: validationError,
      } = validateAndPreprocessDataFromFile(parsed.data as string[]);

      if (validationError) {
        toast.error(validationError);
        return;
      }

      localStorage.setItem(
        LS_EDIT_BEFORE_SENDING_GRID_KEY,
        JSON.stringify(parsedGridData)
      );

      history.push("/editor");
    };
    fileReader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-4xl">Upload a file</h4>
      <p className="mb-3">
        Upload csv file with the problem matrix. Mark empty element as zeroes.
      </p>
      <input
        type="file"
        id="file"
        accept=".csv,.xlsx,.xls,.txt"
        onChange={(e: any) => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
};

export default FileUpload;
