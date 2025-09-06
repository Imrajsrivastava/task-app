
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../lib/task";

export default function NewTask() {
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    navigate("/tasks");
  };

  return (
    <div className="p-6 max-w-md  mx-auto bg-white shadow rounded-xl mt-4">
      <h1 className="text-xl font-bold">Create Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="done">Completed</option>
        </select>

        <button className="bg-green-600 text-white py-2 rounded">Create</button>
      </form>
    </div>
  );
}
