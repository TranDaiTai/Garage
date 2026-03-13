/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "@/api/axiosClient"; 

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin User khi khởi động app hoặc F5 trang
  const fetchMe = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      const res = await axiosClient.get("/auth/verify"); 
      if(res.success && res.data) {
         setUser(res.data.user); // API verify mới trả về { user: ... }
      }
    } catch (err) {
       console.error("Auth Session Expired", err);
       setUser(null);
       localStorage.removeItem('accessToken');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const res = await axiosClient.post('/auth/login', { username, password });
      
      if(res.success) {
        // Lưu token vào localstorage
        localStorage.setItem('accessToken', res.data.accessToken || res.data.token);
        setUser(res.data.user); // login trả về result có field user
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!";
      setError(msg);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch(e) {
      // Bỏ qua lỗi logout mạng
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login, error, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
