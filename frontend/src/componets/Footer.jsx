import { LayoutDashboard, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = ({ activePage }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 w-full bg-white p-4 flex justify-around shadow-md">
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center ${activePage === "tasks" ? "text-blue-500" : "text-gray-700 hover:text-blue-500"}`}
      >
        <LayoutDashboard size={24} />
        <span className="text-xs">Tasks</span>
      </button>
      <button
        onClick={() => navigate("/calendar")}
        className={`flex flex-col items-center ${activePage === "calendar" ? "text-blue-500" : "text-gray-700 hover:text-blue-500"}`}
      >
        <Calendar size={24} />
        <span className="text-xs">Calendar</span>
      </button>
      <button
        onClick={() => navigate("/mine")}
        className={`flex flex-col items-center ${activePage === "mine" ? "text-blue-500" : "text-gray-700 hover:text-blue-500"}`}
      >
        <User size={24} />
        <span className="text-xs">Mine</span>
      </button>
    </div>
  );
};

export default Footer;