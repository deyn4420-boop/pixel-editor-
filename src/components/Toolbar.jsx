export default function Toolbar({ color, setColor, tool, setTool, clearGrid, handleSave,  handleUndo,
  handleRedo}) {
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
      
    </div>
  );
}