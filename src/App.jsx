import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManager from "./pages/TaskManager";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mine" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
