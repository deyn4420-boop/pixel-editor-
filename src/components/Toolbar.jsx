export default function Toolbar({ color, setColor, tool, setTool, clearGrid, handleSave }) {
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
      
    </div>
  );
}