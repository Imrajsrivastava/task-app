
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../lib/task";
import TaskForm from "../components/TaskForm";
import toast from "react-hot-toast";

export default function NewTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => createTask(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task created successfully!");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to create task.");
    },
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <TaskForm onSubmit={(values) => mutation.mutate(values)} />
    </div>
  );
}
