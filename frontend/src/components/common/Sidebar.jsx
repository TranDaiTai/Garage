"use client";
import {
  User,
  ShoppingBag,
  Star,
  CreditCard,
  Settings,
  ClipboardList,
  Calendar,
  Bell,
  Wrench,
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Shield,
  ChevronLeft,
  Phone,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
const UserRole = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const role = user?.role.name ? user.role?.name : null;
  const userNav = [
    { id: "profile", label: "Trung tâm điều khiển", icon: LayoutDashboard },
    { id: "orders", label: "Đơn mua của tôi", icon: ShoppingBag },
    { id: "reviews", label: "Đánh giá sản phẩm", icon: Star },
    { id: "billing", label: "Địa chỉ & Thanh toán", icon: CreditCard },
    { id: "settings", label: "Thiết lập tài khoản", icon: Settings },
  ];

  const staffNav = [
    { id: "profile", label: "Bảng tin nhân viên", icon: LayoutDashboard },
    { id: "tasks", label: "Đơn hàng cần xử lý", icon: ClipboardList },
    { id: "schedule", label: "Lịch trực cửa hàng", icon: Calendar },
    { id: "status", label: "Theo dõi kho vận", icon: Package },
    { id: "notifications", label: "Thông báo hệ thống", icon: Bell },
  ];

  const adminNav = [
    { id: "dashboard", label: "Tổng quan kinh doanh", icon: BarChart3 },
    { id: "users", label: "Quản lý khách hàng", icon: Users },
    { id: "products", label: "Quản trị sản phẩm", icon: Package },
    { id: "orders", label: "Quản lý đơn hàng", icon: ClipboardList },
    { id: "system", label: "Cấu hình EcoMarket", icon: Shield },
  ];

  const getNavItems = () => {
    switch (role) {
      case UserRole.ADMIN:
        return adminNav;
      case UserRole.STAFF:
        return staffNav;
      default:
        return userNav;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (role === UserRole.ADMIN) setActiveTab("dashboard");
    else if (role === UserRole.STAFF) setActiveTab("tasks");
    else setActiveTab("profile");
  }, [role]);

  const navItems = getNavItems();

  if (!user) return null;
  return (
    <>
      <aside
        className={`
        fixed  left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
        h-[calc(100vh-4rem)] top-16
        `}
      >
        <button
          className=" 
        absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-border rounded-full p-1 shadow-lg hidden md:flex
        "
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft className="cursor-pointer" />
        </button>
|
        <div className="h-full flex flex-col ">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <img
              src={user.avatarUrl || "/placeholder"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-l font-bold text-foreground tracking-tight">
                {user.fullName}
              </span>
              <span className="text-sm  text-muted-foreground tracking-tight">
                {role.toLowerCase()}
              </span>
            </div>
            <button className="relative p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1/2 -translate-y-3 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-card"></span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                  w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-secondary text-primary border-l-4 border-accent"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                  }
                `}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4 text-primary-foreground shadow-lg">
              <p className="text-xs font-medium  mb-1">Cần hỗ trợ?</p>
              <p className="text-sm font-bold">Hotline: 1900 1234</p>
            </div>
          </div>
        </div>
      </aside>
      {!isOpen && (
        <aside
          className={`
        fixed  left-0 z-30 w-15 bg-white border-r border-gray-200 transform 
      ${
        isOpen
          ? "-translate-x-15 transition-all duration-300"
          : "translate-x-0 transition-all duration-300"
      }
        h-[calc(100vh-4rem)] top-16
        `}
        >
          <button
            className=" 
        absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-border rounded-full p-1 shadow-lg hidden md:flex
        "
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight className="cursor-pointer" />
          </button>
          <div className="h-full flex flex-col">
            <div className="p-1 border-b border-border flex items-center gap-3">
              <img
                src={user.avatarUrl || "/placeholder"}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            <nav className="flex-1 justify-center overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                  w-full flex items-center justify-center px-1 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                  }
                `}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <Phone size={20} className="mx-auto text-muted-foreground" />
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
