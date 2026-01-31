import { useState, useCallback, useContext, createContext } from 'react';

/**
 * AuthContext for simulating user authentication and persistence.
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback((username) => {
    setUser({ username, loyalty: 'Silver Member' });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook to access authentication context.
 * @returns {{ user, login, logout }}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
