import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../componets/Footer";

const Calendar = () => {
  const [taskStatusByDate, setTaskStatusByDate] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem("taskStatusByDate")) || {};
    setTaskStatusByDate(storedStatus);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Array(31).fill(null).map((_, index) => {
      const day = new Date(year, month, index + 1);
      return day.getMonth() === month ? day.toISOString().split("T")[0] : null;
    }).filter(Boolean);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-white-500 to-white-600 min-h-screen text-white">
      <div className="flex justify-between items-center w-full max-w-lg mb-6 p-4 bg-white text-black rounded-lg shadow-md">
        <button onClick={handlePrevMonth} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
          <ChevronLeft />
        </button>
        <h2 className="text-2xl font-bold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={handleNextMonth} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
          <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 w-full max-w-lg bg-white p-6 rounded-lg shadow-xl text-black">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-700 uppercase tracking-wide">{day}</div>
        ))}
        {getDaysInMonth(currentMonth).map((date) => (
          <div
            key={date}
            className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all shadow-md hover:scale-110 cursor-pointer ${
              taskStatusByDate[date] ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-black text-center">
        <h3 className="text-lg font-bold mb-2">Task Completion Summary</h3>
        <p className="text-gray-700">Days completed: <span className="font-bold text-green-500">{Object.values(taskStatusByDate).filter(Boolean).length}</span></p>
        <p className="text-gray-700">Total tracked days: <span className="font-bold text-blue-500">{Object.keys(taskStatusByDate).length}</span></p>
      </div>

      <Footer/>
    </div>
  );
};

export default Calendar;
