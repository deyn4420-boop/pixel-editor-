import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Grid from "./components/Grid";
import Toolbar from './components/Toolbar';

const App = () => {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [clearFlag, setClearFlag] = useState(false);
  const gridRef = useRef();
  const [undoFn, setUndoFn] = useState(null);
  const [redoFn, setRedoFn] = useState(null);
  const [gridSize, setGridSize] = useState(16);
  const clearGrid = () => {
    setClearFlag(prev => !prev);
  
  };

  const handleSave = async () => {
  const canvas = await html2canvas(gridRef.current);
  const link = document.createElement("a");

  link.download = "pixel-art.png";
  link.href = canvas.toDataURL();
  link.click();
};

  return (
    <div>
      <h2>Pixel Editor</h2>

      <Toolbar
        color={color}
        setColor={setColor}
        tool={tool}
        setTool={setTool}
        clearGrid={clearGrid}
        handleSave={handleSave}
         handleUndo={undoFn}
         handleRedo={redoFn}
         gridSize={gridSize}
         setGridSize={setGridSize}
      />

      <Grid
  selectedColor={color}
  tool={tool}
  clearFlag={clearFlag}
  gridRef={gridRef}
  setUndoFn={setUndoFn}
  setRedoFn={setRedoFn}
  gridSize={gridSize}
/>
    </div>
  );
};

export default App;