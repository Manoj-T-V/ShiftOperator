import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShift, updateShift, resetShifts, toggleTimeFormat } from "../redux/features/shiftSlice";

const ShiftManagement = () => {
  const dispatch = useDispatch();
  const { shifts, timeFormat } = useSelector((state) => state.shift);

  // List of dummy users for workforce
  const dummyUsers = ["Operator A", "Operator B", "Operator C", "Operator D"];

  // State for new shift details
  const [newShift, setNewShift] = useState({
    name: "",
    start: "",
    end: "",
    location: "",
    workforce: [],
    handoverNotes: "", // New state for handover notes
  });

  // State to track the shift being edited
  const [editShift, setEditShift] = useState(null);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  // Add new shift
  const handleAddShift = () => {
    if (newShift.name && newShift.start && newShift.end) {
      dispatch(addShift(newShift));
      setNewShift({ name: "", start: "", end: "", location: "", workforce: [], handoverNotes: "" });
    }
  };

  // Update existing shift fields
  const handleUpdateShift = (id, field, value) => {
    dispatch(updateShift({ id, updates: { [field]: value } }));
  };

  // Handle shift edit functionality
  const handleEditShift = (shift) => {
    setEditShift({ ...shift });
  };

  // Save edited shift
  const handleSaveEditShift = () => {
    if (editShift) {
      dispatch(updateShift({ id: editShift.id, updates: { ...editShift } }));
      setEditShift(null); // Exit edit mode
    }
  };

  // Add a user to the workforce of the shift
  const handleAddToWorkforce = (user) => {
    if (editShift) {
      setEditShift({
        ...editShift,
        workforce: [...editShift.workforce, user],
      });
    }
  };

  // Inline styles for the component
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    marginTop: "10px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const textareaStyle = {
    width: "100%",
    height: "120px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    resize: "vertical",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const tableHeadingStyle = {
    backgroundColor: "#007bff",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Shift Management</h2>

      {/* Toggle Time Format Button */}
      <button onClick={() => dispatch(toggleTimeFormat())} style={buttonStyle}>
        Toggle Time Format ({timeFormat === "24-hour" ? "Switch to 12-hour" : "Switch to 24-hour"})
      </button>

      <h3>Current Shifts</h3>
      {shifts.length === 0 ? (
        <p>No shifts available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeadingStyle}>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Start</th>
              <th style={thTdStyle}>End</th>
              <th style={thTdStyle}>Location</th>
              <th style={thTdStyle}>Workforce</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td>{shift.name}</td>
                <td>{shift.start}</td>
                <td>{shift.end}</td>
                <td>
                  {editShift?.id === shift.id ? (
                    <input
                      type="text"
                      value={editShift.location}
                      onChange={(e) => setEditShift({ ...editShift, location: e.target.value })}
                      style={inputStyle}
                    />
                  ) : (
                    shift.location
                  )}
                </td>
                <td>
                  {editShift?.id === shift.id ? (
                    <div>
                      <input
                        type="text"
                        value={editShift.workforce.join(", ")}
                        onChange={(e) =>
                          setEditShift({
                            ...editShift,
                            workforce: e.target.value.split(",").map((w) => w.trim()),
                          })
                        }
                        style={inputStyle}
                      />
                      <div style={{ marginTop: "10px" }}>
                        <h4>Select Workforce</h4>
                        {dummyUsers.map((user, index) => (
                          <button
                            key={index}
                            onClick={() => handleAddToWorkforce(user)}
                            style={buttonStyle}
                          >
                            {user}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    shift.workforce.join(", ") || "None"
                  )}
                </td>
                <td>
                  {editShift?.id === shift.id ? (
                    <button onClick={handleSaveEditShift} style={buttonStyle}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEditShift(shift)} style={buttonStyle}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reset All Shifts Button */}
      <button onClick={() => dispatch(resetShifts())} style={buttonStyle}>
        Reset All Shifts
      </button>

      <h3>Add New Shift</h3>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Shift Name"
          value={newShift.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="time"
          name="start"
          value={newShift.start}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="time"
          name="end"
          value={newShift.end}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newShift.location}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="handoverNotes"
          placeholder="Handover Notes"
          value={newShift.handoverNotes}
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>
        <button onClick={handleAddShift} style={buttonStyle}>
          Add Shift
        </button>
      </div>
    </div>
  );
};

export default ShiftManagement;
