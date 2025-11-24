import React, { useState, useEffect } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export const Task = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskValue = formData.get("task");
    if (!taskValue) return;

    const newTask = { id: Date.now(), task: taskValue, completed: false };
    setTasks((prev) => [...prev, newTask]);
    e.target.reset();
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCheckChange = (id, checked) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: checked } : task
      )
    );
  };

  const handleEditChange = (id, newValue) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, task: newValue } : task))
    );
  };

  const visibleTasks = showAll ? tasks : tasks.slice(0, 3);

  return (
    <Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Add Task */}
        <div className="card border self-start">
          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xl">Quick Notes and Task</p>
                <p className="opacity-90">Your personal notion dashboard</p>
              </div>
              <form onSubmit={handleSubmit}>
                <Field>
                  <FieldLabel>New Task</FieldLabel>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="task"
                      name="task"
                      autoComplete="off"
                      placeholder="Enter your task here"
                      className="rounded-full border-0 bg-border/50 focus:ring-0 focus:border-0"
                    />
                    <button type="submit">
                      <Plus
                        size={40}
                        className="border rounded-full p-2 hover:bg-border cursor-pointer"
                      />
                    </button>
                  </div>
                </Field>
              </form>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="card border">
          <div className="space-y-2">
            <p className="text-xl">Pending Tasks/Notes</p>
            <p className="opacity-90">Edit your task</p>
          </div>

          {tasks.length === 0 ? (
            <p className="mt-4 italic">No tasks added yet.</p>
          ) : (
            visibleTasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-2xl p-4 flex items-center justify-between mt-4"
              >
                <div className="flex items-center gap-x-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) =>
                      handleCheckChange(task.id, checked)
                    }
                    size={50}
                  />

                  {/* Edit inpput */}
                  {editingTaskId === task.id ? (
                    <Input
                      type="text"
                      defaultValue={task.task}
                      className="rounded-full border-0 bg-border/50 focus:ring-0 focus:border-0"
                      autoFocus
                      onBlur={(e) => {
                        handleEditChange(task.id, e.target.value);
                        setEditingTaskId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditChange(task.id, e.target.value);
                          setEditingTaskId(null);
                        }
                      }}
                    />
                  ) : (
                    <p
                      className={
                        task.completed ? "line-through opacity-50" : ""
                      }
                    >
                      {task.task}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  {editingTaskId === task.id ? (
                    <Check
                      className="hover:cursor-pointer"
                      onClick={() => setEditingTaskId(null)}
                    />
                  ) : (
                    <Pencil
                      onClick={() => setEditingTaskId(task.id)}
                      className="hover:cursor-pointer"
                    />
                  )}

                  <Trash
                    onClick={() => handleDelete(task.id)}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}

          <div className=" text-center mt-4">
            {tasks.length > 3 && (
              <DialogTrigger asChild>
                <p className=" italic underline cursor-pointer">Show more</p>
              </DialogTrigger>
            )}
          </div>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>All Notes/Tasks</DialogTitle>
            </DialogHeader>
            <div className="grid">
              {tasks.length === 0 ? (
                <p className="mt-4 italic">No tasks added yet.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="border rounded-2xl p-4 flex items-center justify-between mt-4"
                  >
                    <div className="flex items-center gap-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) =>
                          handleCheckChange(task.id, checked)
                        }
                        size={50}
                      />

                      {/* Edit inpput */}
                      {editingTaskId === task.id ? (
                        <Input
                          type="text"
                          defaultValue={task.task}
                          className="rounded-full border-0 bg-border/50 focus:ring-0 focus:border-0"
                          autoFocus
                          onBlur={(e) => {
                            handleEditChange(task.id, e.target.value);
                            setEditingTaskId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditChange(task.id, e.target.value);
                              setEditingTaskId(null);
                            }
                          }}
                        />
                      ) : (
                        <p
                          className={
                            task.completed ? "line-through opacity-50" : ""
                          }
                        >
                          {task.task}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      {editingTaskId === task.id ? (
                        <Check
                          className="hover:cursor-pointer"
                          onClick={() => setEditingTaskId(null)}
                        />
                      ) : (
                        <Pencil
                          onClick={() => setEditingTaskId(task.id)}
                          className="hover:cursor-pointer"
                        />
                      )}

                      <Trash
                        onClick={() => handleDelete(task.id)}
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};
