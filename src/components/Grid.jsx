import { useEffect, useState } from "react";
import Pixel from "./Pixel";

const GRID_SIZE = 16;

export default function Grid({ selectedColor, tool,clearFlag,gridRef }){

  const createGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "white")
    );
  };

  const [grid, setGrid] = useState(createGrid);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const paintPixel = (row, col) => {
  setGrid(prev => {
    const newGrid = prev.map(r => [...r]);

    newGrid[row][col] =
      tool === "eraser" ? "white" : selectedColor;

    return newGrid;
  });
};

   useEffect(() => {
    const emptyGrid = createGrid();
    setGrid(emptyGrid);
  }, [clearFlag]);

  useEffect(() => {
  const stopDrawing = () => setIsDrawing(false);

  window.addEventListener("mouseup", stopDrawing);

  return () => window.removeEventListener("mouseup", stopDrawing);
}, []);

  const handleMouseDown = (row, col) => {
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