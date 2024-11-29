// src/components/TaskReportSlicer.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/taskSlice';

const TaskReportSlicer = () => {
  const dispatch = useDispatch();
  const { shift, status, priority } = useSelector((state) => state.tasks.filter);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  return (
    <div>
      <h2>Filter Reports</h2>
      <form>
        <div>
          <label>Shift:</label>
          <select name="shift" value={shift} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={status} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={priority} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default TaskReportSlicer;
