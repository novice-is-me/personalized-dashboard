import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const DraggableContext = ({ id, children }) => {
  // use the useDraggable hooks
  // 1. attributes: accessibility attributes
  // 2. listeners: the acutal drag controls (start, move, stop)
  // 3. setNodeRef: a reference or id to know which item or elements are being dragged
  // 4. transform: the x and y coordinates of the dragged item
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: "transform 0.2s ease",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
