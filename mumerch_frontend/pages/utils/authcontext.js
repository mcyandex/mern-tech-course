import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user, cookie) => {
    setUser({ user, cookie });
  };
  const checkUser = () => {
    //console.log("user:  " + user.user.name)
    //console.log("user:  " + user.cookie)
    return user!= null;
  };
  const logout = () => {
    doSignOut()
  };
  async function doSignOut() {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + 'auth/logout',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      if (response.data==true) {
        console.log(response)
        setUser(null);
        document.cookie = null;
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('error failed: ', error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);