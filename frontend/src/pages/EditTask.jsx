

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTask, updateTask } from "../lib/task";
import TaskForm from "../components/TaskForm";
import toast from "react-hot-toast";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => (await fetchTask(id)).data,
    retry: false,
    onError: (err) => {
      if (err.response?.status === 403) {
        toast.error("Not authorized to view this task.");
      } else if (err.response?.status === 404) {
        toast.error("Task not found.");
      }
      navigate("/dashboard");
    },
  });

  const mutation = useMutation({
    mutationFn: (values) => updateTask(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task updated successfully!");
      navigate("/dashboard");
    },
    onError: (err) => {
      if (err.response?.status === 403) {
        toast.error("Not authorized to update this task.");
      } else if (err.response?.status === 404) {
        toast.error("Task not found.");
      } else {
        toast.error("Failed to update task.");
      }
    },
  });

  if (isLoading) return <p>Loading task...</p>;
  if (isError) return null;

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <TaskForm initialData={data} onSubmit={handleSubmit} />
    </div>
  );
}
