import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "../redux/features/selectors";

const TaskReport = () => {
  const filteredTasks = useSelector(selectFilteredTasks);

  // Group tasks by shift and calculate pending/completed task counts
  const shiftReport = filteredTasks.reduce((acc, task) => {
    // If the shift is not already in the accumulator, add it
    if (!acc[task.shift]) {
      acc[task.shift] = { completed: 0, pending: 0, tasks: [] };
    }
    // Increment the count based on the task status and add task to the respective shift
    if (task.status === "Completed") {
      acc[task.shift].completed++;
    } else {
      acc[task.shift].pending++;
    }
    acc[task.shift].tasks.push(task); // Add task to the shift's task list
    return acc;
  }, {});

  // Convert the shiftReport object to an array of shifts
  const shiftReportArray = Object.keys(shiftReport).map((shiftName) => ({
    shift: shiftName,
    ...shiftReport[shiftName],
  }));

  // Inline styles for table and summary
  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyles = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const tableHeadingStyles = {
    backgroundColor: "#007bff",
    color: "white",
  };

  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Shift Task Report</h2>

      <h3 style={{ color: "#333" }}>Shift-wise Task Summary</h3>
      {shiftReportArray.length === 0 ? (
        <p>No tasks available for the selected filters.</p>
      ) : (
        shiftReportArray.map((shift, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            {/* Display Shift Summary */}
            <h4>{shift.shift} Shift</h4>
            <p>Pending Tasks: {shift.pending}</p>
            <p>Completed Tasks: {shift.completed}</p>

            {/* Display Task Details under the Shift */}
            <h5>Task Details</h5>
            <table style={tableStyles}>
              <thead>
                <tr style={tableHeadingStyles}>
                  <th style={thTdStyles}>Title</th>
                  <th style={thTdStyles}>Status</th>
                  <th style={thTdStyles}>Priority</th>
                  <th style={thTdStyles}>Details</th>
                  <th style={thTdStyles}>Supervisor Feedback</th>
                  <th style={thTdStyles}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {shift.tasks.map((task) => (
                  <tr key={task.id}>
                    <td style={thTdStyles}>{task.title}</td>
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
        ))
      )}
    </div>
  );
};

export default TaskReport;
