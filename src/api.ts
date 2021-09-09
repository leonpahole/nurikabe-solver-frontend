const apiUrl = process.env.REACT_APP_API_URL;

interface SolveResponse {
  data: number[][];
  solution: boolean[][];
  elapsedTime: number;
}

export const SEA = -1;

const transformSolveResponse = (res: SolveResponse): number[][] => {
  const transformed: number[][] = [];

  for (let ri = 0; ri < res.data.length; ri++) {
    const transformedRow = [];
    for (let ci = 0; ci < res.data[ri].length; ci++) {
      const dataCol = res.data[ri][ci];
      const solutionCol = res.solution[ri][ci];
      if (solutionCol) {
        transformedRow.push(SEA);
      } else if (dataCol > 0) {
        transformedRow.push(dataCol);
      } else {
        transformedRow.push(0);
      }
    }

    transformed.push(transformedRow);
  }

  return transformed;
};

export const sendDataToAlgorithm = async (
  data: number[][]
): Promise<{ solution: number[][]; elapsedTime: number }> => {
  const res = await fetch(`${apiUrl}/solve`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const solution = await res.json();
  return {
    solution: transformSolveResponse(solution),
    elapsedTime: solution.elapsedTime,
  };
};
