import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredTasks } from "../redux/features/selectors";

const TaskReport = () => {
  const filteredTasks = useSelector(selectFilteredTasks);

  // Group tasks by shift and calculate pending/completed task counts
  const shiftReport = filteredTasks.reduce((acc, task) => {
    // If the shift is not already in the accumulator, add it
    if (!acc[task.shift]) {
      acc[task.shift] = { completed: 0, pending: 0 };
    }
    // Increment the count based on the task status
    if (task.status === "Completed") {
      acc[task.shift].completed++;
    } else {
      acc[task.shift].pending++;
    }
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
        <table style={tableStyles}>
          <thead>
            <tr style={tableHeadingStyles}>
              <th style={thTdStyles}>Shift</th>
              <th style={thTdStyles}>Pending Tasks</th>
              <th style={thTdStyles}>Completed Tasks</th>
            </tr>
          </thead>
          <tbody>
            {shiftReportArray.map((shift, index) => (
              <tr key={index}>
                <td style={thTdStyles}>{shift.shift}</td>
                <td style={thTdStyles}>{shift.pending}</td>
                <td style={thTdStyles}>{shift.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskReport;
