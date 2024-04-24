// src/components/NewTaskForm.js

import React, { useState } from 'react';

const NewTaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [jackpot, setJackpot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, jackpot });
    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setDueDate('');
    setJackpot('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="jacpot">jacpot:</label>
        <textarea
          id="jacpot"
          className="form-control"
          value={jackpot}
          onChange={(e) => setJackpot(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
