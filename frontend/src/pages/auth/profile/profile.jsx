import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/api/axiosClient";
import { 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  Bell
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./admin";
import { StaffDashboard } from "./staff";
import { UserDashboard } from "./user";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && activeTab === "orders") {
      fetchOrders();
    }
  }, [user, activeTab]);

  useEffect(() => {
    // Set default tab based on roles on component mount
    if (user && activeTab === 'dashboard') {
       if (user.role?.name === 'ADMIN' || user.roleId === 1) {
          setActiveTab('admin-dash');
       } else if (user.role?.name === 'STAFF' || user.roleId === 2) {
          setActiveTab('staff-dash');
       }
    }
  }, [user]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("/orders");
      const orderData = response.data || response || [];
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
      case "PROCESSING": return "bg-blue-50 text-blue-600 border-blue-100";
      case "SHIPPED": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "DELIVERED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "CANCELLED": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-secondary text-primary/60 border-secondary";
    }
  };

  if (!user) {
     return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 py-20 animate-fadeIn">
           <div className="w-24 h-24 bg-secondary/50 rounded-[2rem] flex items-center justify-center mb-8 text-muted-foreground/30 shadow-inner">
              <User className="w-12 h-12" />
           </div>
           <h2 className="text-3xl font-black text-primary mb-4 tracking-tight uppercase">BẠN CHƯA ĐĂNG NHẬP</h2>
           <p className="text-muted-foreground mb-10 text-center max-w-sm font-medium italic">Vui lòng đăng nhập để quản lý đơn hàng và trải nghiệm các tính năng dành riêng cho thành viên.</p>
           <button 
             onClick={() => navigate("/login")}
             className="btn-primary px-12 py-5 font-black uppercase tracking-widest active:scale-95 shadow-xl"
           >
              Đăng nhập ngay
           </button>
        </div>
     );
  }

  const SidebarItem = ({ id, icon: Icon, label, colorClass = "text-primary" }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black transition-all group ${
        activeTab === id 
        ? 'bg-primary text-white shadow-premium' 
        : `text-primary/60 hover:bg-secondary hover:text-primary`
      }`}
    >
      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.15em]">
        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === id ? 'text-white' : colorClass}`} />
        {label}
      </div>
      <ChevronRight className={`w-4 h-4 transition-all ${activeTab === id ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-background pb-32 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Hero Header */}
        <div className="premium-card bg-white p-10 md:p-14 mb-16 overflow-hidden relative animate-slideUp">
           {/* Abstract Backgrounds */}
           <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">
              <div className="relative group">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-secondary flex items-center justify-center text-primary text-5xl font-black shadow-inner border-2 border-white uppercase transition-transform group-hover:scale-105">
                    {user.name?.[0] || user.username?.[0] || "U"}
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-premium border border-gray-50 flex items-center justify-center text-accent cursor-pointer hover:bg-accent hover:text-white transition-all animate-bounce-slow">
                    <Settings className="w-5 h-5" />
                 </div>
              </div>

              <div className="flex-1 text-center md:text-left pt-2">
                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className="text-4xl font-black text-primary tracking-tighter uppercase">{user.name || user.username}</h1>
                    <div className="px-4 py-1.5 rounded-full bg-accent text-[10px] font-black text-white uppercase tracking-widest shadow-sm">
                       {user.role?.name || "Member"}
                    </div>
                 </div>
                 
                 <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                       <Mail className="w-4 h-4 text-accent" /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                       <Calendar className="w-4 h-4 text-accent" /> Gia gia {new Date(user.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                  <button className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all relative">
                     <Bell className="w-5 h-5"/>
                     <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                  </button>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 bg-red-50 text-red-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-red-100 hover:bg-red-600 hover:text-white transition-all active:scale-95 group"
                  >
                     <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Thoát
                  </button>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
           
           {/* Navigation Sidebar */}
           <div className="lg:col-span-4 space-y-4 animate-slideUp delay-100 lg:sticky lg:top-32">
              <div className="premium-card bg-white p-6 space-y-2 border border-gray-50 shadow-sm">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-6 mb-4 mt-2">Điều khiển chính</p>
                 
                 {(user.role?.name === 'ADMIN' || user.roleId === 1) && (
                    <SidebarItem id="admin-dash" icon={ShieldCheck} label="Quản trị tối cao" colorClass="text-purple-500" />
                 )}
                 
                 {(user.role?.name === 'STAFF' || user.roleId === 2) && (
                    <SidebarItem id="staff-dash" icon={LayoutDashboard} label="Vận hành hệ thống" colorClass="text-emerald-500" />
                 )}

                 <SidebarItem id="dashboard" icon={LayoutDashboard} label="Tổng quan" colorClass="text-accent" />
                 <SidebarItem id="orders" icon={ShoppingBag} label="Đơn hàng của tôi" colorClass="text-indigo-500" />
                 <SidebarItem id="info" icon={User} label="Hồ sơ thành viên" colorClass="text-blue-500" />
                 <SidebarItem id="addresses" icon={MapPin} label="Sổ địa chỉ" colorClass="text-amber-500" />
              </div>
              
              <div className="px-10 py-6 text-center opacity-40">
                 <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Hội viên từ 2024</p>
              </div>
           </div>

           {/* Content Display Area */}
           <div className="lg:col-span-8 animate-slideUp delay-200">
              
              {/* DASHBOARDS */}
              {activeTab === 'admin-dash' && <AdminDashboard user={user} />}
              {activeTab === 'staff-dash' && <StaffDashboard user={user} />}
              {activeTab === 'dashboard' && <UserDashboard user={user} />}

              {/* ORDERS LIST */}
              {activeTab === 'orders' && (
                 <div className="space-y-12">
                    <div className="flex items-center justify-between px-4">
                       <h2 className="text-3xl font-black text-primary tracking-tight uppercase">LỊCH SỬ GIAO DỊCH</h2>
                       <button 
                         onClick={fetchOrders} 
                         className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline underline-offset-8 decoration-2"
                       >
                         Cập nhật danh sách
                       </button>
                    </div>
                    
                    {isLoading ? (
                       <div className="premium-card p-24 flex flex-col items-center justify-center bg-white border border-gray-50 shadow-sm">
                          <div className="w-12 h-12 border-[6px] border-secondary border-t-accent rounded-full animate-spin mb-6 shadow-inner"></div>
                          <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Đang tải dữ liệu giao dịch...</p>
                       </div>
                    ) : orders.length > 0 ? (
                       <div className="grid gap-8">
                          {orders.map((order) => (
                             <div key={order.id} className="premium-card bg-white p-8 md:p-10 border border-gray-50 shadow-sm hover:shadow-premium transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-2 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                                   <div className="flex items-center gap-6">
                                      <div className="w-16 h-16 bg-secondary/50 rounded-3xl flex items-center justify-center text-primary border border-white shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                                         <Package className="w-8 h-8" />
                                      </div>
                                      <div>
                                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Mã vận đơn</p>
                                         <p className="text-xl font-black text-primary uppercase tracking-tight">#{order.id.toString().slice(-8).toUpperCase()}</p>
                                      </div>
                                   </div>
                                   
                                   <div className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(order.status)}`}>
                                      <span className="flex items-center gap-2">
                                         <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                         {order.status || "Chờ xử lý"}
                                      </span>
                                   </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-end border-t border-secondary pt-8 gap-8">
                                   <div className="flex flex-col gap-4">
                                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sản phẩm: {order.orderItems?.length || 0}</p>
                                      <div className="flex -space-x-4 overflow-hidden p-1">
                                         {order.orderItems?.slice(0, 4).map((item, idx) => (
                                            <img 
                                               key={idx} 
                                               src={item.product?.images?.[0]?.imageUrl || 'https://placehold.co/100x100/png?text=Item'} 
                                               alt="" 
                                               className="h-12 w-12 rounded-2xl ring-4 ring-white object-cover shadow-sm border border-secondary" 
                                            />
                                         ))}
                                         {order.orderItems?.length > 4 && (
                                            <div className="flex items-center justify-center h-12 w-12 rounded-2xl ring-4 ring-white bg-secondary text-[10px] font-black text-primary border border-white shadow-sm">
                                               +{order.orderItems.length - 4}
                                            </div>
                                         )}
                                      </div>
                                   </div>
                                   
                                   <div className="text-right space-y-1">
                                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Tổng giá trị</p>
                                      <p className="text-3xl font-black text-primary tracking-tighter">{(order.totalAmount || 0).toLocaleString('vi-VN')}đ</p>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                    ) : (
                       <div className="premium-card p-24 flex flex-col items-center justify-center bg-white border border-gray-50 shadow-sm text-center">
                          <div className="w-24 h-24 bg-secondary rounded-[2rem] flex items-center justify-center mb-8 text-muted-foreground shadow-inner">
                             <ShoppingBag className="w-10 h-10" />
                          </div>
                          <h3 className="text-2xl font-black text-primary mb-2 uppercase tracking-tight">KHO TRỐNG RỖNG</h3>
                          <p className="text-primary/40 mb-12 max-w-xs font-medium italic">Có vẻ như bạn chưa có đơn hàng nào. Hãy lấp đầy nó bằng những sản phẩm tuyệt vời!</p>
                          <button 
                            onClick={() => navigate("/shop")}
                            className="btn-secondary px-10 py-4 font-black text-[10px] uppercase tracking-widest active:scale-95 shadow-md"
                          >
                             Đến cửa hàng ngay
                          </button>
                       </div>
                    )}
                 </div>
              )}

              {/* ACCOUNT INFO */}
              {activeTab === 'info' && (
                 <div className="premium-card bg-white p-10 md:p-14 shadow-premium border border-gray-50 animate-slideUp">
                    <h2 className="text-3xl font-black text-primary mb-12 uppercase tracking-tight">HỒ SƠ CÁ NHÂN</h2>
                    <form className="space-y-10">
                       <div className="grid md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Tên hiển thị</label>
                             <input 
                                type="text" 
                                defaultValue={user.name || user.username} 
                                className="w-full bg-secondary/50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-accent font-bold text-primary transition-all outline-none"
                             />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Đường dây nóng cá nhân</label>
                             <input 
                                type="tel" 
                                defaultValue={user.phone} 
                                placeholder="VD: 09xx xxx xxx"
                                className="w-full bg-secondary/50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-accent font-bold text-primary transition-all outline-none"
                             />
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Email xác thực</label>
                          <input 
                             type="email" 
                             defaultValue={user.email} 
                             disabled 
                             className="w-full bg-secondary/20 border-none rounded-2xl px-6 py-5 text-primary/40 font-bold cursor-not-allowed opacity-60"
                          />
                          <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em] ml-2">ⓘ Email của thành viên không thể thay đổi vì lý do bảo mật.</p>
                       </div>

                       <div className="pt-8 border-t border-secondary flex flex-col md:flex-row gap-6">
                          <button type="submit" className="flex-1 btn-primary py-5 font-black uppercase tracking-widest active:scale-95 shadow-xl">
                             Lưu cập nhật
                          </button>
                          <button type="button" className="flex-1 btn-secondary py-5 font-black uppercase tracking-widest active:scale-95">
                             Thay đổi mật mã
                          </button>
                       </div>
                    </form>
                 </div>
              )}

              {/* ADDRESSES */}
              {activeTab === 'addresses' && (
                 <div className="space-y-12">
                    <div className="flex items-center justify-between px-4">
                       <h2 className="text-3xl font-black text-primary tracking-tight uppercase">SỔ ĐỊA CHỈ GIAO HÀNG</h2>
                       <button className="btn-secondary px-6 py-2.5 text-[10px] font-black uppercase tracking-widest active:scale-95 shadow-sm">Thêm địa chỉ</button>
                    </div>

                    <div className="premium-card bg-white p-10 md:p-12 border border-accent/20 shadow-premium relative overflow-hidden group animate-slideUp">
                       <div className="absolute top-0 right-0 px-6 py-2 bg-accent text-white text-[9px] font-black rounded-bl-3xl uppercase tracking-widest shadow-sm">Mặc định</div>
                       <div className="flex items-start gap-8">
                          <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center text-accent shadow-inner border border-white">
                             <MapPin className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                             <p className="text-2xl font-black text-primary tracking-tight mb-2 uppercase">{user.name || user.username}</p>
                             <div className="space-y-1">
                                <p className="text-muted-foreground font-medium italic leading-relaxed">{user.address || "Địa chỉ chưa được cập nhật chính thức."}</p>
                                <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-6">Liên hệ: {user.phone || "---"}</p>
                             </div>
                             <div className="flex gap-8 mt-10 border-t border-secondary pt-8">
                                <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline underline-offset-8 decoration-2">Chỉnh sửa</button>
                                <button className="text-[10px] font-black text-primary/20 uppercase tracking-widest hover:text-red-500 transition-colors">Gỡ bỏ</button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              )}

           </div>
        </div>
      </div>
    </div>
  );
}
