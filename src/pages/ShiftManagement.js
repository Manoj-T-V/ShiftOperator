import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShift, updateShift, resetShifts, toggleTimeFormat } from "../redux/features/shiftSlice";

const ShiftManagement = () => {
  const dispatch = useDispatch();
  const { shifts, timeFormat } = useSelector((state) => state.shift);
  const [newShift, setNewShift] = useState({ name: "", start: "", end: "", location: "", workforce: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleAddShift = () => {
    if (newShift.name && newShift.start && newShift.end) {
      dispatch(addShift(newShift));
      setNewShift({ name: "", start: "", end: "", location: "", workforce: [] });
    }
  };

  const handleUpdateShift = (id, field, value) => {
    dispatch(updateShift({ id, updates: { [field]: value } }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shift Management</h2>

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
                  <input
                    type="text"
                    value={shift.location}
                    onChange={(e) => handleUpdateShift(shift.id, "location", e.target.value)}
                  />
                </td>
                <td>{shift.workforce.join(", ") || "None"}</td>
                <td>
                  <button onClick={() => handleUpdateShift(shift.id, "workforce", ["Operator A", "Operator B"])}>
                    Assign Workforce
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
