import axios from 'axios';

// Khởi tạo instance của Axios
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Địa chỉ Backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cho phép đính kèm Cookie nếu có
});

// THÊM INTERCEPTOR ĐỂ XỬ LÝ REQUEST TRƯỚC KHI GỬI ĐI
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy Token từ LocalStorage (hoặc nơi bạn lưu trữ)
    const token = localStorage.getItem('accessToken');
    
    // Nếu có Token thì nhét vào Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// THÊM INTERCEPTOR ĐỂ XỬ LÝ SAU KHI SERVER TRẢ VỀ (RESPONSE)
axiosClient.interceptors.response.use(
  (response) => {
    // Chỉ lấy phần data trả về cho gọn nhẹ
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Xử lý lỗi tập trung, ví dụ token hết hạn -> văng ra màn login
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
      // Có thể gọi hàm logout ở đây: localStorage.removeItem('accessToken')...
    }
    throw error;
  }
);

export default axiosClient;
