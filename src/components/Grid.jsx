import { useEffect, useState } from "react";
import Pixel from "./Pixel";

const GRID_SIZE = 16;

export default function Grid({ selectedColor, tool, clearFlag, gridRef, setUndoFn, setRedoFn}){

  const createGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "white")
    );
  };

  const [history, setHistory] = useState([createGrid()]);
  const [currentStep, setCurrentStep] = useState(0);

  const grid = history[currentStep];
  const [isDrawing, setIsDrawing] = useState(false);
  
const paintPixel = (row, col) => {
  setHistory(prevHistory => {
    const step = currentStep; // capture

    const current = prevHistory[step];
    const newGrid = current.map(r => [...r]);

    const newColor =
      tool === "eraser" ? "white" : selectedColor;

    if (current[row][col] === newColor) return prevHistory;

    newGrid[row][col] = newColor;

    const newHistory = prevHistory.slice(0, step + 1);
    newHistory.push(newGrid);

    setCurrentStep(step + 1);

    return newHistory;
  });
};
const floodFill = (row, col) => {
  setHistory(prevHistory => {
    const step = currentStep;

    const gridCopy = prevHistory[step].map(r => [...r]);

    const targetColor = gridCopy[row][col];
    const newColor = selectedColor;

    if (targetColor === newColor) return prevHistory;

    const fill = (r, c) => {
      if (
        r < 0 || c < 0 ||
        r >= GRID_SIZE || c >= GRID_SIZE
      ) return;

      if (gridCopy[r][c] !== targetColor) return;

      gridCopy[r][c] = newColor;

      fill(r + 1, c);
      fill(r - 1, c);
      fill(r, c + 1);
      fill(r, c - 1);
    };

    fill(row, col);

    const newHistory = prevHistory.slice(0, step + 1);
    newHistory.push(gridCopy);

    setCurrentStep(step + 1);

    return newHistory;
  });
};

const handleUndo = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};

const handleRedo = () => {
  if (currentStep < history.length - 1) {
    setCurrentStep(currentStep + 1);
  }
};

useEffect(() => {
  setUndoFn(() => handleUndo);
  setRedoFn(() => handleRedo);
}, [currentStep, history]);

   useEffect(() => {
  const empty = createGrid();
  setHistory([empty]);
  setCurrentStep(0);
}, [clearFlag]);

  useEffect(() => {
  const stopDrawing = () => setIsDrawing(false);

  window.addEventListener("mouseup", stopDrawing);

  return () => window.removeEventListener("mouseup", stopDrawing);
}, []);

  const handleMouseDown = (row, col) => {
  if (tool === "fill") {
    floodFill(row, col);
    return;
  }

  setIsDrawing(true);
  paintPixel(row, col);
};

   const handleMouseEnter = (row, col) => {
    if (!isDrawing) return;
    paintPixel(row, col);
   };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };



  return (
    <div ref={gridRef} onMouseUp={handleMouseUp}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((color, colIndex) => (
            <Pixel
              key={colIndex}
              color={color}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}