
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit } from "lucide-react";
import { deleteTask } from "../lib/task";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function TaskCard({ task }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task deleted successfully!");
    },
    onError: (err) => {
      if (err.response?.status === 403) {
        toast.error("Not authorized to delete this task.");
      } else if (err.response?.status === 404) {
        toast.error("Task not found.");
      } else {
        toast.error("Failed to delete task.");
      }
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      mutation.mutate(task._id);
    }
  };


  const formattedDate = new Date(task.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 border rounded-xl bg-white shadow-md hover:shadow-lg transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-lg text-gray-800">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full ${
              task.status === "done"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>
          <span className="text-gray-500 text-xs">
            Created: {formattedDate}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/tasks/edit/${task._id}`}
          className="text-blue-500 hover:text-blue-700 transition"
          title="Edit Task"
        >
          <Edit size={20} />
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
