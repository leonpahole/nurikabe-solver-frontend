import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NurikabeEditor from "../components/grid/NurikabeEditor";
import Loading from "../components/Loading";
import { LS_EDIT_BEFORE_SENDING_GRID_KEY, LS_SOLUTION_KEY } from "../constants";

const ViewSolution: React.FC<{}> = () => {
  const history = useHistory();

  const [solution, setSolution] = useState<number[][]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!history) {
      return;
    }

    const solutionStr = localStorage.getItem(LS_SOLUTION_KEY);
    if (!solutionStr) {
      history.push("/");
      return;
    }

    try {
      const solutionData = JSON.parse(solutionStr);
      setSolution(solutionData.solution);
      setElapsedTime(solutionData.elapsedTime);
      setLoading(false);
    } catch (e) {
      history.push("/");
    }
  }, [history]);

  const onBackToHomeClick = () => {
    localStorage.removeItem(LS_EDIT_BEFORE_SENDING_GRID_KEY);
    localStorage.removeItem(LS_SOLUTION_KEY);
    history.push("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-6xl">Solution</h1>
      <p>Elapsed time (on server): {elapsedTime} ms</p>

      <div className="mt-6">
        <NurikabeEditor grid={solution} />
      </div>

      <p className="mt-3 underline text-blue-500">
        <Link to="/editor">Back to editor</Link>
      </p>

      <p
        className="mt-2 underline cursor-pointer text-red-500 mb-4"
        onClick={onBackToHomeClick}
      >
        Back to home
      </p>
    </div>
  );
};

export default ViewSolution;
