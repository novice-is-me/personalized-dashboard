import { useEffect, useState } from "react";

import {
  closestCenter, // center is the droppable area
  DndContext, // like a context provider that wraps draggable and droppable components
  PointerSensor, // detects mouse pointer for dragging
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { TimeGreet } from "@/components/TimeGreet";
import { ImageComponent } from "@/components/ImageComponent";
import { Weather } from "@/components/Weather";
import { DailyQoute } from "@/components/DailyQoute";
import { SortableCard } from "@/components/SortableCard";
import { Task } from "@/components/Task";

function Home() {
  // Default order
  const defaultWidgets = [
    "time-greet",
    "image-component",
    "weather",
    "daily-quote",
  ];

  // Load the save widget from local or use the default
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("widgetOrder");
    return saved ? JSON.parse(saved) : defaultWidgets;
  });

  // Set up instance for sensors (like mouse, touch)
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle what happens when dragging ends
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // if dropped outside or same position, do nothing
    if (!over || active.id === over.id) return;

    // re-order widgets
    setWidgets((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      const newOrder = arrayMove(prev, oldIndex, newIndex);

      // Save the new order in local
      localStorage.setItem("widgetOrder", JSON.stringify(newOrder));

      return newOrder;
    });
  };

  const onRemove = (id) => {
    setWidgets((prev) => {
      const newOrder = prev.filter((widgetId) => widgetId !== id);

      // Save the new order in local
      localStorage.setItem("widgetOrder", JSON.stringify(newOrder));

      return newOrder;
    });
  };

  return (
    <div className="body-style space-y-6 overflow-">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToWindowEdges]} // prevents dragging outside window
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {widgets.map((id, index) => {
              // The first widget takes full width (col-span-3)
              const colSpan =
                index === 0 ? "md:col-span-3 w-full" : "md:col-span-1 w-full";

              return (
                <div key={id} className={colSpan}>
                  <SortableCard id={id} onRemove={onRemove}>
                    {id === "time-greet" && <TimeGreet />}
                    {id === "image-component" && <ImageComponent />}
                    {id === "weather" && <Weather />}
                    {id === "daily-quote" && <DailyQoute />}
                  </SortableCard>
                </div>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
      <div className=" border-t">
        <Task />
      </div>
    </div>
  );
}

export default Home;
