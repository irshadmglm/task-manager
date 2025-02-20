import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2, PlusCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../componets/Footer";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskStatusByDate, setTaskStatusByDate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const storedStatus = JSON.parse(localStorage.getItem("taskStatusByDate")) || {};
      setTasks(storedTasks);
      setTaskStatusByDate(storedStatus);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (tasks.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]); // Now updates only when tasks change

  useEffect(() => {
    try {
      localStorage.setItem("taskStatusByDate", JSON.stringify(taskStatusByDate));
    } catch (error) {
      console.error("Error saving task status by date:", error);
    }
  }, [taskStatusByDate]);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Ensures completion status is saved
      return updatedTasks;
    });
  };
  

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Ensures tasks are updated in localStorage
      return updatedTasks;
    });
  };
  
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = { id: Date.now(), name: newTask, completed: false };
      setTasks(prevTasks => [...prevTasks, newTaskObj]); // Use functional update to ensure latest state
      setNewTask("");
      setShowInput(false);
    }
  };

  useEffect(() => {
    const updateDailyStatus = () => {
      const today = new Date().toISOString().split("T")[0];
      const isCompleted = tasks.length > 0 && tasks.every(task => task.completed);

      setTaskStatusByDate(prevStatus => ({
        ...prevStatus,
        [today]: isCompleted,
      }));
    };
    updateDailyStatus();
  }, [tasks]); // Runs only when tasks change

  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen relative">
      <div className={`px-6 py-2 rounded-md font-semibold mb-4 ${
  tasks.length === 0 
    ? "bg-gray-100 text-gray-600" 
    : allTasksCompleted 
    ? "bg-green-100 text-green-600" 
    : "bg-red-100 text-red-600"
}`}>
  {tasks.length === 0 
    ? "THERE IS NO TASK" 
    : allTasksCompleted 
    ? "YOUR TODAY'S TASK IS COMPLETED" 
    : "YOUR TODAY'S TASK IS NOT COMPLETED"}
</div>


      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center px-6 py-3 rounded-lg shadow-md w-80 ${
              task.completed ? "bg-blue-100" : "bg-gray-300"
            }`}
          >
            <span className="font-semibold">{task.name}</span>
            <div className="flex space-x-2">
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? (
                  <CheckCircle className="text-blue-500" />
                ) : (
                  <XCircle className="text-gray-500" />
                )}
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <Trash2 className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showInput && (
        <div className="absolute bottom-36 right-16 bg-white shadow-lg p-4 rounded-lg flex items-center">
          <input
            type="text"
            className="border px-2 py-1 rounded-md focus:outline-none"
            placeholder="Enter task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md" onClick={addTask}>Add</button>
        </div>
      )}
     <button
        className="absolute bottom-20 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        onClick={() => setShowInput(!showInput)}
      >
        <PlusCircle size={32} />
      </button>
      
      <Footer/>
    </div>
  );
};

export default TaskManager;

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log("Service Worker Registered!", reg))
      .catch(err => console.error("Service Worker Registration Failed!", err));
  });
}
