import { memo } from "react";

const Pixel = ({ color, onMouseDown, onMouseEnter }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        border: "1px solid #ccc"
      }}
    />
  );
};

export default memo(Pixel);