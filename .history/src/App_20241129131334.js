import ShiftManagement from './pages/ShiftManagement';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddTaskForm from './pages/AddTaskform';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/shift" element={<ShiftManagement/>}></Route>
      <Route path="/" element={<AddTaskForm/>}></Route>
      <Route path="/report" element={<AddTaskForm/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
