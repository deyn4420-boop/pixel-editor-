import { useState } from "react";
import Pixel from "./Pixel";

const GRID_SIZE = 16;

export default function Grid() {

  const createGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "white")
    );
  };

  const [grid, setGrid] = useState(createGrid);


    const handlePixelClick = (row, col) => {
    const newGrid = grid.map(r => [...r]); // copy

    newGrid[row][col] = "black"; // change color

    setGrid(newGrid);
  };


    return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((color, colIndex) => (
            <Pixel
              key={colIndex}
              color={color}
              onClick={() => handlePixelClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
