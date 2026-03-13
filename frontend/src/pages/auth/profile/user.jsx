/* eslint-disable no-unused-vars */
import React from "react";
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ChevronRight, 
  Box,
  Truck,
  CreditCard,
  Crown,
  Ticket,
  MapPin,
  Settings,
  Bell,
  LogOut,
  Gift
} from "lucide-react";

export const UserDashboard = ({ user }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Welcome / Tier Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-950 rounded-2xl p-8 text-white relative flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-xl border border-gray-800">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <div className="absolute bottom-0 right-32 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
         
         <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
               <span className="text-3xl font-black text-gray-300">{user.name?.charAt(0) || user.username?.charAt(0) || "U"}</span>
            </div>
            <div className="space-y-1 text-left">
               <p className="text-sm font-medium text-gray-400">Chào mừng trở lại,</p>
               <h3 className="text-2xl font-bold tracking-tight">{user.name || user.username}</h3>
               <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30 flex items-center gap-1.5">
                     <Crown className="w-3.5 h-3.5" /> Thành Viên Vàng
                  </span>
               </div>
            </div>
         </div>

         <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 w-full md:w-[320px] relative z-10 shrink-0">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <p className="text-xs text-gray-400 mb-1">Eco Points</p>
                  <p className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                     1,250 <Gift className="w-5 h-5" />
                  </p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] text-gray-400">Cần 750 điểm nữa</p>
                  <p className="text-xs font-medium text-white">Lên Hạng Kim Cương</p>
               </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3 overflow-hidden">
               <div className="bg-gradient-to-r from-amber-400 to-amber-200 h-1.5 rounded-full" style={{ width: "62%" }}></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
         
         {/* Sidebar Menu */}
         <div className="md:col-span-3 space-y-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100 hidden md:block">
            <SidebarItem icon={ShoppingBag} label="Đơn mua của tôi" active />
            <SidebarItem icon={Heart} label="Sản phẩm yêu thích" />
            <SidebarItem icon={Star} label="Đánh giá sản phẩm" />
            <SidebarItem icon={Ticket} label="Kho Voucher" badge="3" />
            <div className="h-px bg-gray-100 my-4 mx-2"></div>
            <SidebarItem icon={MapPin} label="Sổ địa chỉ" />
            <SidebarItem icon={CreditCard} label="Thẻ ngân hàng" />
            <SidebarItem icon={Settings} label="Thiết lập tài khoản" />
         </div>

         {/* Main Activity Area */}
         <div className="md:col-span-9 space-y-6">
            
            {/* Quick Stats Banner */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
               <h4 className="font-bold text-gray-900 mb-6">Trạng thái đơn hàng</h4>
               <div className="flex justify-between items-center px-2 md:px-8">
                  <OrderStatus icon={Box} label="Chờ xác nhận" count={1} />
                  <OrderStatus icon={CreditCard} label="Chờ thanh toán" count={0} />
                  <OrderStatus icon={Truck} label="Đang giao" count={2} color="text-blue-500" />
                  <OrderStatus icon={Star} label="Đánh giá" count={0} />
               </div>
            </div>

            {/* Recent Orders (Mock) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h4 className="font-bold text-gray-900">Đơn hàng gần đây</h4>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                     Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
               </div>
               
               <div className="p-0">
                  {/* Item 1 */}
                  <div className="p-6 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                           <Truck className="w-4 h-4 text-blue-500" /> ĐANG GIAO HÀNG
                        </span>
                        <span className="text-xs text-gray-500">Mã: ECO-1928374</span>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md border border-gray-200 p-2 flex shrink-0">
                           <img src="https://placehold.co/100x100?text=Product" className="w-full h-full object-contain mix-blend-multiply" alt="SP" />
                        </div>
                        <div className="flex-1">
                           <h5 className="font-medium text-gray-900 line-clamp-2">Sản phẩm Sinh Thái Thân Thiện Cao Cấp</h5>
                           <p className="text-sm text-gray-500 mt-1">Phân loại: Xanh lá</p>
                           <p className="text-sm text-gray-500">x1</p>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                           <span className="text-lg font-bold text-red-600">450.000đ</span>
                        </div>
                     </div>
                  </div>

                  {/* Empty state for empty orders if needed */}
                  {/* <div className="p-12 flex flex-col items-center justify-center text-center">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                     </div>
                     <p className="text-sm text-gray-500">Chưa có đơn hàng nào</p>
                  </div> */}
               </div>
            </div>

            {/* Promotional Banner inside profile */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 flex items-center justify-between">
               <div>
                  <h4 className="font-bold text-blue-900 mb-1">Mời bạn thân, nhận quà chất!</h4>
                  <p className="text-sm text-blue-700/80">Nhận ngay voucher 100k cho mỗi lời mời thành công.</p>
               </div>
               <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors text-sm">
                  Mời Ngay
               </button>
            </div>

         </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
   <div className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${active ? "bg-primary/5 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
      <div className="flex items-center gap-3">
         <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-gray-400"}`} />
         <span className="text-sm">{label}</span>
      </div>
      {badge && (
         <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
         </span>
      )}
   </div>
);

const OrderStatus = ({ icon: Icon, label, count, color = "text-gray-600" }) => (
   <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="relative">
         <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors border border-gray-100">
            <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
         </div>
         {count > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
               {count}
            </div>
         )}
      </div>
      <p className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{label}</p>
   </div>
);
