import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShift, updateShift, resetShifts, toggleTimeFormat } from "../redux/features/shiftSlice";

const ShiftManagement = () => {
  const dispatch = useDispatch();
  const { shifts, timeFormat } = useSelector((state) => state.shift);

  // List of dummy users for workforce
  const dummyUsers = ["Operator A", "Operator B", "Operator C", "Operator D"];

  // State for new shift details
  const [newShift, setNewShift] = useState({ name: "", start: "", end: "", location: "", workforce: [] });

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
      setNewShift({ name: "", start: "", end: "", location: "", workforce: [] });
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shift Management</h2>

      {/* Toggle Time Format Button */}
      <button onClick={() => dispatch(toggleTimeFormat())}>
        Toggle Time Format ({timeFormat === "24-hour" ? "Switch to 12-hour" : "Switch to 24-hour"})
      </button>

      <h3>Current Shifts</h3>
      {shifts.length === 0 ? (
        <p>No shifts available.</p>
      ) : (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
              <th>Workforce</th>
              <th>Actions</th>
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
                      />
                      <div style={{ marginTop: "10px" }}>
                        <h4>Select Workforce</h4>
                        {dummyUsers.map((user, index) => (
                          <button
                            key={index}
                            onClick={() => handleAddToWorkforce(user)}
                            style={{ marginRight: "10px" }}
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
                    <button onClick={handleSaveEditShift}>Save</button>
                  ) : (
                    <button onClick={() => handleEditShift(shift)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reset All Shifts Button */}
      <button onClick={() => dispatch(resetShifts())} style={{ marginTop: "20px" }}>
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
        />
        <input
          type="time"
          name="start"
          value={newShift.start}
          onChange={handleChange}
        />
        <input
          type="time"
          name="end"
          value={newShift.end}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newShift.location}
          onChange={handleChange}
        />
        <button onClick={handleAddShift}>Add Shift</button>
      </div>
    </div>
  );
};

export default ShiftManagement;
