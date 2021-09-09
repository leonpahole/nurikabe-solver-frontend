import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import FileUpload from "../components/mainPage/FileUpload";
import StartFromScratch from "../components/mainPage/StartFromScratch";
import UseTemplates from "../components/mainPage/UseTemplates";
import { LS_EDIT_BEFORE_SENDING_GRID_KEY } from "../constants";

const FirstPage: React.FC<{}> = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!history) {
      return;
    }

    if (localStorage.getItem(LS_EDIT_BEFORE_SENDING_GRID_KEY)) {
      history.push("/editor");
    } else {
      setLoading(false);
    }
  }, [history]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-6xl font-bold">Nurikabe solver</h1>

      <div className="mt-6 mb-6">
        <FileUpload />
      </div>

      <p>or...</p>

      <div className="mt-6 mb-6">
        <StartFromScratch />
      </div>

      <p>or...</p>

      <div className="mt-6 mb-6">
        <UseTemplates />
      </div>
    </div>
  );
};

export default FirstPage;
