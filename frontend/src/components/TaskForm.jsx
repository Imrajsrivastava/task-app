
import { useState, useEffect } from "react";

export default function TaskForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); 
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold">{initialData ? "Update Task" : "Create Task"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Task description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
