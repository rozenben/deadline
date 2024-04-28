// Task.js

import React from 'react';

const Task = ({ name, description, dates }) => {
  return (
    <div className="card mb-3 " style={{ width: '300px', background: '#fddea8'}}>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Dates:</p>
            <ul>
                {dates.map((date, index) => (
                    <li key={index}>
                        <input className='mr-3' type="checkbox" id={`checkbox-${index}`} />
                        <label htmlFor={`checkbox-${index}`}>{date}</label>
                    </li>
                ))}
            </ul>
            <div className="row">
                <div className="col-auto">
                    <p className="card-text">Jackpot:</p>
                </div>
                <div className="col-auto">
                    <p className="card-text">0</p>
                </div>
            </div>

        </div>
    </div>

  );
};

export default Task;
