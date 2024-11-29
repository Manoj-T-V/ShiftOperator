// src/components/TaskReport.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../';

const TaskReport = () => {
  const filteredTasks = useSelector(selectFilteredTasks);

  const taskSummary = filteredTasks.reduce(
    (acc, task) => {
      if (task.status === "Completed") {
        acc.completed++;
      } else {
        acc.pending++;
      }
      if (task.priority === "High") {
        acc.highPriority++;
      }
      return acc;
    },
    { completed: 0, pending: 0, highPriority: 0 }
  );

  return (
    <div>
      <h2>Shift Task Report</h2>
      <div>
        <h3>Summary</h3>
        <p>Completed Tasks: {taskSummary.completed}</p>
        <p>Pending Tasks: {taskSummary.pending}</p>
        <p>High Priority Tasks: {taskSummary.highPriority}</p>
      </div>
      <h3>Task Details</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Shift</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Details</th>
            <th>Supervisor Feedback</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.shift}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.details}</td>
              <td>{task.supervisorFeedback}</td>
              <td>{task.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskReport;
