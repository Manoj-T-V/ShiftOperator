// src/pages/ReportPage.js
import React from 'react';
import TaskReportSlicer from './';
import TaskReport from '../components/TaskReport';

const ReportPage = () => {
  return (
    <div>
      <h1>Shift Task Reports</h1>
      <TaskReportSlicer />
      <TaskReport />
    </div>
  );
};

export default ReportPage;
