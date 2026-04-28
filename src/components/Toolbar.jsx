export default function Toolbar({ color, setColor, tool, setTool, clearGrid, handleSave,  handleUndo,
  handleRedo, gridSize,setGridSize}) {
  return (
    <div style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "10px"
    }}>
      
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <button onClick={() => setTool("brush")}>
        Brush
      </button>

      <button onClick={() => setTool("eraser")}>
        Eraser
      </button>

      <button onClick={clearGrid}>
        Clear
      </button>
     
     <button onClick={handleSave}>Save</button>

    <button onClick={handleUndo} disabled={!handleUndo}>
     Undo
    </button>

    <button onClick={handleRedo} disabled={!handleRedo}>
     Redo
    </button>

    <button onClick={() => setTool("fill")}>
     Fill
    </button>


    <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
  <option value={16}>16 x 16</option>
  <option value={32}>32 x 32</option>
  <option value={64}>64 x 64</option>
</select>
      
    </div>
  );
}