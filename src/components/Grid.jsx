import { useEffect } from "react";
import { useState } from "react";
import Pixel from "./Pixel";

const GRID_SIZE = 16;

export default function Grid({ selectedColor, tool, clearFlag }){

  const createGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "white")
    );
  };

  const [grid, setGrid] = useState(createGrid);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const paintPixel = (row, col) => {
  const newGrid = grid.map(r => [...r]);

  if (tool === "eraser") {
    newGrid[row][col] = "white";
  } else {
    newGrid[row][col] = selectedColor;
  }

  setGrid(newGrid);
};


 useEffect(() => {
    const emptyGrid = createGrid();
    setGrid(emptyGrid);
  }, [clearFlag]);

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
    <div onMouseUp={handleMouseUp}>
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