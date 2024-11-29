import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/features/tasksSlice';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');
  const [shift, setShift] = useState('Morning');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [handoverNotes, setHandoverNotes] = useState(''); // New state for handover notes

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, details, source, shift, status, priority, handoverNotes }; // Include handoverNotes
    dispatch(addTask(newTask));
    setTitle('');
    setDetails('');
    setSource('');
    setShift('Morning');
    setStatus('Pending');
    setPriority('Medium');
    setHandoverNotes(''); 
  };

  // Inline styles for form and inputs
  const formContainerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    height: "120px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    resize: "vertical",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2>Add New Task</h2>

      <div>
        <label style={labelStyle}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Details:</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
          style={textareaStyle}
        ></textarea>
      </div>

      <div>
        <label style={labelStyle}>Source:</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Shift:</label>
        <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          style={inputStyle}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Handover Notes:</label>
        <textarea
          value={handoverNotes}
          onChange={(e) => setHandoverNotes(e.target.value)}
          style={textareaStyle}
          placeholder="Enter handover details for the next team..."
        ></textarea>
      </div>

      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
};

export default AddTaskForm;
