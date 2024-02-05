import React from "react";
import KanbanCard from "./Card";

const Board = ({ tasks, status, statusIcon }) => {
  return (
    <div className="board">
      <div className="board-title">
        <div className="board-headings">
          {/* <span style={{ marginRight: "10px" }}>{statusIcon}</span> */}
          {statusIcon}
          <h2 style={{ marginLeft: "10px" }}>{status} </h2>
          <h3 style={{ color: "gray", marginLeft: "10px" }}>{tasks.length}</h3>
        </div>
        <div className="board-headings">
          <span className="material-symbols-outlined board-icons">add</span>
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
      </div>
      {tasks.map((task) => (
        <KanbanCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default function KanbanBoard({ groupedTasks }) {
  return (
    <div className="kanbanBoard">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <Board
          key={status}
          tasks={tasks.tasks}
          status={tasks.status}
          statusIcon={tasks.icon}
        />
      ))}
    </div>
  );
}
