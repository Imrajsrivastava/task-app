
import { useQuery } from "@tanstack/react-query";
import TaskCard from "../components/TaskCard";
import { fetchTasks } from "../lib/task";

export default function Tasks({ ownerId, params, setParams }) {
  const { data: response, isLoading } = useQuery({
    queryKey: ["tasks", ownerId, params],
    queryFn: () => fetchTasks(params), 
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    setParams({ ...params, page: newPage });
  };

  if (isLoading) return <p>Loading tasks...</p>;

  const data = response?.data || {};
  const tasks = data.tasks || [];
  const totalPages = data.pages || 1;

  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p className="text-gray-500">No tasks found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(params.page - 1)}
            disabled={params.page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                params.page === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(params.page + 1)}
            disabled={params.page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
