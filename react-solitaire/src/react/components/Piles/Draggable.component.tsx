/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-optimization */
/* eslint-disable no-console */
/*import React, { useState } from "react";

const AppDragDropDemo = () => {
  const [stateTasks, setStateTask] = useState<
    Array<{ name: string; category: string; bgcolor: string }>
  >([
    { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
    { name: "React", category: "wip", bgcolor: "pink" },
    { name: "Vue", category: "complete", bgcolor: "skyblue" }
  ]);
  const updateTaskGroups = () => {
    const tempTaskGroups: any = { wip: [], complete: [] };
    stateTasks.forEach((t: any) => {
      tempTaskGroups[t.category].push(
        <div
          key={t.name}
          onDragStart={(e: any) => onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return tempTaskGroups;
  };
  const [taskGroups, setTasksGroups] = useState(updateTaskGroups());

  const onDragStart = (
    ev: { dataTransfer: { setData: (arg0: string, arg1: any) => void } },
    id: any
  ) => {
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
  };

  const onDrop = (
    ev: { dataTransfer: { getData: (arg0: string) => any } },
    cat: string
  ) => {
    const id = ev.dataTransfer.getData("id");

    const tasks = stateTasks.filter((task: any) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    setStateTask(tasks);
    setTasksGroups(updateTaskGroups());
  };

  return (
    <div className="container-drag">
      <h2 className="header">DRAG & DROP DEMO</h2>
      <div
        className="wip"
        onDragOver={(e: any) => onDragOver(e)}
        onDrop={(e: any) => {
          onDrop(e, "wip");
        }}
      >
        <span className="task-header">WIP</span>
        {taskGroups.wip}
      </div>
      <div
        className="droppable"
        onDragOver={(e: any) => onDragOver(e)}
        onDrop={(e: any) => onDrop(e, "complete")}
      >
        <span className="task-header">COMPLETED</span>
        {taskGroups.complete}
      </div>
    </div>
  );
};

export default AppDragDropDemo;
 */

import React from "react";

const ToDelete = () => {
  return <div>To delete</div>;
};

export default ToDelete;
