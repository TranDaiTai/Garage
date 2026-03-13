/* eslint-disable no-unused-vars */
import React from "react";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Box,
  User,
  ExternalLink,
  ClipboardList
} from "lucide-react";

const mockOrdersToProcess = [
  { id: "ORD-9901", customer: "Lê Minh Quân", items: 3, status: "Mới", time: "10 phút trước", priority: "Cao" },
  { id: "ORD-9902", customer: "Trần Thị Lan", items: 1, status: "Đang xử lý", time: "25 phút trước", priority: "Thường" },
  { id: "ORD-9903", customer: "Phạm Văn Đức", items: 5, status: "Mới", time: "40 phút trước", priority: "Khẩn cấp" },
  { id: "ORD-9904", customer: "Nguyễn Thu Hà", items: 2, status: "Chờ lấy hàng", time: "1 giờ trước", priority: "Thường" },
];

export const StaffDashboard = ({ user }) => {
  return (
    <div className="space-y-12 animate-slideUp">
      {/* Quick Ops Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <OpsCard 
          icon={ClipboardList} 
          label="Đơn hàng chờ xử lý" 
          value="24" 
          color="border-l-indigo-500" 
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
        />
        <OpsCard 
          icon={Truck} 
          label="Đang vận chuyển" 
          value="156" 
          color="border-l-amber-500" 
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
        <OpsCard 
          icon={CheckCircle2} 
          label="Hoàn tất hôm nay" 
          value="89" 
          color="border-l-emerald-500" 
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Order Queue */}
        <div className="lg:col-span-8">
          <div className="premium-card bg-white border border-gray-50 shadow-sm overflow-hidden h-full">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-secondary/10">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Hàng đợi xử lý đơn</h4>
              <button className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest hover:underline decoration-2">
                Bộ lọc nâng cao <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-secondary/30">
              {mockOrdersToProcess.map((order) => (
                <div key={order.id} className="p-8 hover:bg-secondary/10 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary/40 border border-white shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                      <Box className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-xs font-black text-primary uppercase tracking-tight">#{order.id}</p>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          order.priority === 'Khẩn cấp' ? 'bg-rose-500 text-white animate-pulse' : 
                          order.priority === 'Cao' ? 'bg-amber-500 text-white' : 'bg-secondary text-primary/40'
                        }`}>
                          {order.priority}
                        </span>
                      </div>
                      <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                        Khách: {order.customer} • {order.items} sản phẩm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-primary/60 uppercase">{order.status}</p>
                      <p className="text-[9px] font-bold text-primary/30 uppercase tracking-tighter">{order.time}</p>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-secondary/5 text-center border-t border-gray-50">
               <button className="text-[10px] font-black text-primary/40 uppercase tracking-widest hover:text-primary transition-colors">Xem toàn bộ 24 đơn hàng đang chờ</button>
            </div>
          </div>
        </div>

        {/* Notifications & Announcements */}
        <div className="lg:col-span-4 space-y-8">
           <div className="premium-card bg-primary p-10 text-white h-full border border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/5">
                      <AlertCircle className="w-5 h-5 text-accent" />
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Bảng tin nội bộ</h4>
                </div>
                
                <div className="space-y-8 flex-1">
                  <AnnouncementItem 
                    title="Cập nhật quy trình vận chuyển" 
                    desc="Áp dụng từ ngày mai cho đơn nội thành" 
                    time="1 giờ trước" 
                  />
                  <AnnouncementItem 
                    title="Kiểm kê kho định kỳ" 
                    desc="Yêu cầu hoàn trả biên bản trước 18h" 
                    time="3 giờ trước" 
                    isPriority={true}
                  />
                  <AnnouncementItem 
                    title="Ưu đãi đối tác vận chuyển" 
                    desc="Giao hàng tiết kiệm giảm 10% phí" 
                    time="8 giờ trước" 
                  />
                </div>
                
                <button className="w-full mt-12 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">
                   Gửi thông báo mới
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const OpsCard = ({ icon: Icon, label, value, color, bgColor, textColor }) => (
  <div className={`premium-card bg-white p-8 border border-gray-50 shadow-sm border-l-8 ${color} group hover:shadow-premium transition-all`}>
    <div className="flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgColor} ${textColor} shadow-inner`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-3xl font-black text-primary tracking-tighter uppercase">{value}</p>
      </div>
    </div>
  </div>
);

const AnnouncementItem = ({ title, desc, time, isPriority }) => (
  <div className={`p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm relative group hover:bg-white/10 transition-colors shadow-sm ${isPriority ? 'border-l-4 border-l-accent' : ''}`}>
     <p className="text-xs font-black uppercase tracking-tight mb-1">{title}</p>
     <p className="text-[10px] opacity-60 font-medium italic mb-4 leading-relaxed">{desc}</p>
     <div className="flex justify-between items-center">
        <p className="text-[8px] font-black uppercase tracking-widest opacity-40">{time}</p>
        <button className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronRight className="w-3 h-3 text-white" />
        </button>
     </div>
  </div>
);
