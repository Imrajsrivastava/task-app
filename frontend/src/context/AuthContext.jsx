import { createContext, useContext, useState, useEffect } from "react";
import { logout } from "../lib/auth";
import { getCurrentUser } from "../lib/task";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data); 
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);


  const handleLogout = async () => {
    await logout(); 
    setUser(null);  
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

