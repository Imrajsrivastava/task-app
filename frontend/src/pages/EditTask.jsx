import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTask, updateTask } from "../lib/task";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => (await fetchTask(id)).data,
  });

  const mutation = useMutation({
    mutationFn: ({ id, values }) => updateTask(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); 
      navigate("/dashboard"); 
    },
  });

  if (isLoading) return <p>Loading task...</p>;

  const handleSubmit = (values) => {
    mutation.mutate({ id, values });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <TaskForm initialData={data} onSubmit={handleSubmit} />
    </div>
  );
}
