export const validateAndPreprocessDataFromFile = (
  data: string[]
): { data?: number[][]; error?: string } => {
  const preprocessedData: number[][] = [];
  let rowSize: number | null = null;

  let rowI = 1;
  for (let row of data) {
    if (row.length === 0) {
      continue;
    }

    if (row.length === 1 && row[0].trim().length === 0) {
      continue;
    }

    const parsedRow: number[] = [];
    let colI = 1;
    for (let col of row) {
      const parsedNumber = Number(col);
      if (isNaN(parsedNumber) || parsedNumber == null) {
        return {
          error: `Value at row ${rowI} and column ${colI} is not a number! All values should be valid numbers.`,
        };
      }

      if (parsedNumber < 0) {
        return {
          error: `Value at row ${rowI} and column ${colI} is a negative number! All values should be positive numbers or zero.`,
        };
      }

      parsedRow.push(parsedNumber);
      colI++;
    }

    if (rowSize == null) {
      rowSize = parsedRow.length;
    } else if (parsedRow.length !== rowSize) {
      return {
        error: `Rows don't have inconsistent number of columns: row ${rowI} has ${parsedRow.length} columns, expected were ${rowSize} columns.`,
      };
    }

    preprocessedData.push(parsedRow);
    rowI++;
  }

  return {
    data: preprocessedData,
  };
};
