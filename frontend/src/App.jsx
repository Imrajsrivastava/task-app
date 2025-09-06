
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewTask from "./pages/NewTask";
import Navbar from "./components/Navbar";
import EditTask from "./pages/EditTask";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();
  console.log("User in App.jsx:", user);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks/edit/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <NewTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
           <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
