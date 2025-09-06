

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Tasks from "./Tasks";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [params, setParams] = useState({ page: 1, limit: 5, q: "", status: "all" });
    const navigate = useNavigate();
  
const redirectAddTask = () => {
    navigate("/tasks/new");
  }
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="p-6 bg-white shadow rounded-xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-gray-700">
            Welcome, <span className="font-medium">{user?.name}</span> 🎉
          </p>
        </div>
        <button
          onClick={redirectAddTask}
        className="bg-green-600 text-white px-3 py-1 rounded transition text-white py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={params.q}
          onChange={(e) => setParams({ ...params, q: e.target.value, page: 1 })}
          className="border p-2 rounded flex-1"
        />
        <select
          value={params.status}
          onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      <Tasks ownerId={user?._id} params={params} setParams={setParams} />
    </div>
  );
}
