import { useState } from 'react';
import Grid from "./components/Grid";

const App = () => {
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");


  

  return (
    <div>
      <h2>Pixel Editor</h2>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />


      <button onClick={() => setTool("brush")}>Brush</button>
<button onClick={() => setTool("eraser")}>Eraser</button>

      <Grid selectedColor={color} tool={tool} />
    </div>
  );
};

export default App;