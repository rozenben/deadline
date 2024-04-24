import React, { useState } from 'react';
import NewTaskForm from './NewTaskForm';
import Task from './Task';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('my-tasks');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [myTasks, setMyTasks] = useState([
    {
      name: 'Task 1',
      description: 'Description of Task 1',
      dates: ['2024-04-25', '2024-04-26']
    },
    {
      name: 'Task 2',
      description: 'Description of Task 2',
      dates: ['2024-04-27', '2024-04-28']
    }
  ]);

  const [followTasks, setFollowTasks] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleNewTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
  };

  const handleNewTaskSubmit = (taskData) => {

    console.log(taskData)
    // Create a new task object
    const newTask = {
      name: taskData.title,
      description: taskData.description,
      dates: [taskData.dueDate]
    };
    
    // Update the tasks state by adding the new task to the existing tasks array
    setMyTasks([...myTasks, newTask]);

    // Close the new task form
    setShowNewTaskForm(false);
  };

  return (
    <div >
      <ul className="nav nav-tabs">
        <li className="nav-item" >
          <button
            className={`nav-link ${activeTab === 'my-tasks' ? 'active' : ''}`}
            onClick={() => handleTabClick('my-tasks')}
            style={{backgroundColor: '#fddea8'}}
          >
            My Tasks
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'follow-tasks' ? 'active' : ''}`}
            onClick={() => handleTabClick('follow-tasks')}
            style={{backgroundColor: '#fddea8'}}
          >
            Follow Tasks
          </button>
        </li>
      </ul>
      <div className="tab-content mt-2">
        <div className={`tab-pane ${activeTab === 'my-tasks' ? 'active' : ''}`} id="my-tasks">
          <h2>My Tasks</h2>
          <div>
            {myTasks.length > 0 ? (
              myTasks.map((task, index) => (
                <Task key={index} {...task} />
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
          <button className="btn btn-primary" onClick={toggleNewTaskForm}>Create a new task</button>
          {showNewTaskForm && <NewTaskForm onSubmit={handleNewTaskSubmit} />}
        </div>
        <div className={`tab-pane ${activeTab === 'follow-tasks' ? 'active' : ''}`} id="follow-tasks">
          <h2>Follow Tasks</h2>
          <div>
            {followTasks.length > 0 ? (
              followTasks.map((task, index) => (
                <Task key={index} {...task} />
              ))
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
