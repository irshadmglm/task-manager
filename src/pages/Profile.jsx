import { useState, useEffect } from "react";
import { LayoutDashboard, Calendar, List, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "../componets/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completed = storedTasks.filter(task => task.completed).length;
    const pending = storedTasks.length - completed;
    setCompletedTasks(completed);
    setPendingTasks(pending);

    const taskStatusByDate = JSON.parse(localStorage.getItem("taskStatusByDate")) || {};
    const historyData = Object.entries(taskStatusByDate).map(([date, status]) => ({
      date,
      completed: status ? 1 : 0,
    }));
    setTaskHistory(historyData);
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Tasks Overview</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-3xl font-bold">{completedTasks}</p>
          <p className="text-gray-600">Completed Tasks</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-3xl font-bold">{pendingTasks}</p>
          <p className="text-gray-600">Pending Tasks</p>
        </div>
      </div>
      
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="font-bold mb-2">Completion of Daily Tasks</h3>
        {taskHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={taskHistory}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400">No task data</div>
        )}
      </div>
      
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="font-bold">Tasks in Next 7 Days</h3>
        <p className="text-gray-500">Upcoming tasks will be displayed here.</p>
      </div>
      
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="font-bold flex justify-between">
          Pending Tasks in Categories <span className="text-gray-500">In 30 days</span>
        </h3>
        <div className="h-32 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full"></div>
          <p className="text-blue-500 ml-4">Daily to do <span className="font-bold">{pendingTasks}</span></p>
        </div>
      </div>

     <Footer/>
    </div>
  );
};

export default Profile;
