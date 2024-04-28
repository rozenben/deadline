import axios from "axios";

import React, { useContext, useState, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import { UserContext } from "./MainProvider";

const Tabs = () => {
  const { user } = useContext(UserContext); // Access user context
  const [activeTab, setActiveTab] = useState("my-tasks");
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/tasks/${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log("data.tasks: ", data.tasks);
        setMyTasks(data.tasks || []); // Ensure tasks is initialized as an empty array if it's not present in the response
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    // Call the fetchTasks function when the component mounts
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [followTasks, setFollowTasks] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleNewTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
  };

  const handleNewTaskSubmit = async (taskData) => {
    // Create a new task object
    const newTask = {
      task_name: taskData.title,
      description: taskData.description,
      creator_id: user.userId,
      dates: [taskData.dueDate],
      jackpot: taskData.jackpot,
    };
    console.log(newTask);
    setMyTasks([...myTasks, newTask]);
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:8000/tasks/",
        newTask
      ); // TODO
      console.log("Task created successfully:", response.data);
      // Update the tasks state or perform any necessary actions
    } catch (error) {
      console.error("Error creating task:", error);
    }

    // Close the new task form
    setShowNewTaskForm(false);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "my-tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("my-tasks")}
            style={{ backgroundColor: "#fddea8" }}
          >
            My Tasks
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "follow-tasks" ? "active" : ""
            }`}
            onClick={() => handleTabClick("follow-tasks")}
            style={{ backgroundColor: "#fddea8" }}
          >
            Follow Tasks
          </button>
        </li>
      </ul>
      <div className="tab-content mt-2">
        <div
          className={`tab-pane ${activeTab === "my-tasks" ? "active" : ""}`}
          id="my-tasks"
        >
          <h2>My Tasks</h2>
          <div>
            {myTasks.length > 0 ? (
              myTasks.map((task, index) => <Task key={index} {...task} />)
            ) : (
              <p>No tasks available</p>
            )}
          </div>
          <button className="btn btn-primary" onClick={toggleNewTaskForm}>
            Create a new task
          </button>
          {showNewTaskForm && <NewTaskForm onSubmit={handleNewTaskSubmit} />}
        </div>
        <div
          className={`tab-pane ${activeTab === "follow-tasks" ? "active" : ""}`}
          id="follow-tasks"
        >
          <h2>Follow Tasks</h2>
          <div>
            {followTasks.length > 0 ? (
              followTasks.map((task, index) => <Task key={index} {...task} />)
            ) : (
              <p>No follow tasks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
