import { useState } from 'react';
import Grid from "./components/Grid";
import Toolbar from './components/Toolbar';

const App = () => {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [clearFlag, setClearFlag] = useState(false);

  const clearGrid = () => {
    setClearFlag(prev => !prev);
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
      />

      <Grid
        selectedColor={color}
        tool={tool}
        clearFlag={clearFlag}
      />
    </div>
  );
};

export default App;