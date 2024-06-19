import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: false,
});

export default AuthContext;

const token = localStorage.getItem("token");

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    setLoading(true);
    const resp = await fetch("http://localhost:4000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await resp.json();

    setLoading(false);

    setUser(data.user);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
