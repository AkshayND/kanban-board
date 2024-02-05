import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import KanbanBoard from "./components/Board";
import Header from "./components/Header";
import { useSelector } from "react-redux";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const group = useSelector((state) => state.filtering.group);
  const order = useSelector((state) => state.filtering.order);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const priorityIcons = {
    0: <span className="material-symbols-outlined">more_horiz</span>,
    1: <span className="material-symbols-outlined">signal_cellular_1_bar</span>,
    2: <span className="material-symbols-outlined">signal_cellular_3_bar</span>,
    3: <span className="material-symbols-outlined">signal_cellular_4_bar</span>,
    4: <span className="material-symbols-outlined">error</span>,
  };

  const priorityLabels = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const tickets = result.data.tickets;
      const users = result.data.users;
      const userMap = {};
      for (const user of users) {
        if (userMap[user.id] == undefined) {
          user.color = getRandomColor();
          userMap[user.id] = user;
        }
      }
      for (const ticket of tickets) {
        ticket.user = userMap[ticket.userId];
        ticket.priorityIcon = priorityIcons[ticket.priority];
      }
      setIsLoading(false);

      setTasks(tickets);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const statusIcons = {
      Todo: (
        <span className="material-symbols-outlined board-icons">circle</span>
      ),
      "In progress": (
        <span className="material-symbols-outlined board-icons">
          clock_loader_40
        </span>
      ),
      Done: <span className="material-symbols-outlined">check_circle</span>,
      Backlog: <span className="material-symbols-outlined">pending</span>,
      Canceled: <span className="material-symbols-outlined">cancel</span>,
    };

    let tickets = [...tasks];
    if (tickets.length > 0) {
      let sortedTasks;
      if (order == "title") {
        sortedTasks = tickets.sort((taskA, taskB) =>
          taskA[order].localeCompare(taskB[order])
        );
      } else {
        sortedTasks = tickets.sort(
          (taskA, taskB) => taskA[order] - taskB[order]
        );
      }
      let filteredTasks;
      if (group == "status") {
        filteredTasks = sortedTasks.reduce((group, task) => {
          const { status } = task;
          group[status] = group[status] ?? {
            status: status,
            tasks: [],
            icon: statusIcons[status],
          };

          group[status].tasks.push(task);
          return group;
        }, {});
      } else if (group == "priority") {
        filteredTasks = sortedTasks.reduce((group, task) => {
          const { priority } = task;
          group[priority] = group[priority] ?? {
            status: priorityLabels[priority],
            tasks: [],
            icon: priorityIcons[priority],
          };

          group[priority].tasks.push(task);
          return group;
        }, {});
      } else if (group == "user") {
        filteredTasks = sortedTasks.reduce((group, task) => {
          const { user } = task;
          const userName = user.name;
          const initials = user.name
            .split(" ")
            .map((name) => name[0])
            .join("");
          const icon = (
            <div className="avatar-container">
              <div
                className="user-avatar"
                style={{ backgroundColor: user.color }}
              >
                {initials}
              </div>
              <div
                className="status-indicator"
                style={{ backgroundColor: user.available ? "#00FF00" : "red" }}
              ></div>
            </div>
          );
          group[userName] = group[userName] ?? {
            status: userName,
            tasks: [],
            icon: icon,
          };

          group[userName].tasks.push(task);
          return group;
        }, {});
        filteredTasks = Object.keys(filteredTasks)
          .sort()
          .reduce((obj, key) => {
            obj[key] = filteredTasks[key];
            return obj;
          }, {});
      }

      console.log(filteredTasks);
      setIsLoading(false);
      setGroupedTasks(filteredTasks);
    }
  }, [group, order, tasks]);

  return (
    <>
      <Header />
      <main>
        {isLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
        {!isLoading && <KanbanBoard groupedTasks={groupedTasks} />}
      </main>
    </>
  );
};

export default App;
