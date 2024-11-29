// src/components/TaskReport.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../redux/features/selectors';

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

  // Inline styles for table and summary
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyles = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };



  const summaryContainer = {
    marginBottom: '20px',
  };

  const summaryText = {
    margin: '5px 0',
    fontSize: '16px',
  };

  const tableHeadingStyles = {
    backgroundColor: '#007bff',
    color: 'white',
  };

  const taskRowStyles = {
    backgroundColor: '#f9f9f9',
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Shift Task Report</h2>
      <div style={summaryContainer}>
        <h3 style={{ color: '#333' }}>Summary</h3>
        <p style={summaryText}>Completed Tasks: {taskSummary.completed}</p>
        <p style={summaryText}>Pending Tasks: {taskSummary.pending}</p>
        <p style={summaryText}>High Priority Tasks: {taskSummary.highPriority}</p>
      </div>
      <h3 style={{ color: '#333' }}>Task Details</h3>
      <table style={tableStyles}>
        <thead>
          <tr style={tableHeadingStyles}>
            <th style={thTdStyles}>Title</th>
            <th style={thTdStyles}>Shift</th>
            <th style={thTdStyles}>Status</th>
            <th style={thTdStyles}>Priority</th>
            <th style={thTdStyles}>Details</th>
            <th style={thTdStyles}>Supervisor Feedback</th>
            <th style={thTdStyles}>Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              style={taskRowStyles}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'} // Hover effect
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            >
              <td style={thTdStyles}>{task.title}</td>
              <td style={thTdStyles}>{task.shift}</td>
              <td style={thTdStyles}>{task.status}</td>
              <td style={thTdStyles}>{task.priority}</td>
              <td style={thTdStyles}>{task.details}</td>
              <td style={thTdStyles}>{task.supervisorFeedback}</td>
              <td style={thTdStyles}>{task.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskReport;
