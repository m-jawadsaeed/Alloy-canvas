import { useState } from "react";

export const useCanvas =
  () => {
    const [tool, setTool] =
      useState("pencil");

    const [color, setColor] =
      useState("#000000");

    return {
      tool,
      setTool,
      color,
      setColor,
    };
  };