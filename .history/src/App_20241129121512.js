import ShiftManagement from './pages/ShiftManagement';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/shift" element={<ShiftManagement/>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
