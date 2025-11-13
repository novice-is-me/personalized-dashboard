import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";

export const SortableCard = ({ id, children, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Create a specific area for dragging instead of the whole cards. */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab active:cursor-grabbing z-10 p-1  rounded"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className="absolute top-2 right-2 z-10 p-1 hover:bg-red-100 rounded"
      >
        <X className="w-5 h-5 hover:cursor-pointer" />
      </button>

      {children}
    </div>
  );
};
