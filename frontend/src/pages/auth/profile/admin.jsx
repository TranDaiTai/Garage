/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Box,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PackageCheck
} from "lucide-react";

const chartData = [
  { name: "Thứ 2", rev: 4000, orders: 24 },
  { name: "Thứ 3", rev: 3000, orders: 18 },
  { name: "Thứ 4", rev: 2000, orders: 12 },
  { name: "Thứ 5", rev: 2780, orders: 20 },
  { name: "Thứ 6", rev: 1890, orders: 15 },
  { name: "Thứ 7", rev: 2390, orders: 22 },
  { name: "Chủ nhật", rev: 3490, orders: 30 },
];

export default function AdminDashboard({ user }) {
  return (
    <div className="space-y-12 animate-slideUp">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          icon={DollarSign} 
          label="Tổng doanh thu" 
          value="450.2M" 
          trend="+12.5%" 
          isUp={true} 
          color="bg-emerald-500" 
        />
        <MetricCard 
          icon={ShoppingCart} 
          label="Đơn hàng mới" 
          value="142" 
          trend="+5.2%" 
          isUp={true} 
          color="bg-blue-500" 
        />
        <MetricCard 
          icon={Users} 
          label="Khách hàng" 
          value="1.2k" 
          trend="-2.4%" 
          isUp={false} 
          color="bg-amber-500" 
        />
        <MetricCard 
          icon={PackageCheck} 
          label="Tỷ lệ hoàn tất" 
          value="98.5%" 
          trend="+1.2%" 
          isUp={true} 
          color="bg-indigo-500" 
        />
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
           <div className="premium-card bg-white p-10 border border-gray-50 shadow-sm relative overflow-hidden h-full">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Phân tích doanh thu tuần</h3>
                  <div className="flex gap-4">
                     <span className="flex items-center gap-2 text-[8px] font-black text-primary/40 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-accent"></span> Doanh thu</span>
                  </div>
               </div>
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                        dy={20}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                        dx={-20}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                          padding: '16px' 
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rev" 
                        stroke="#f57c00" 
                        strokeWidth={4} 
                        dot={{ r: 0 }} 
                        activeDot={{ r: 8, fill: '#f57c00', stroke: '#fff', strokeWidth: 4 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="premium-card bg-secondary/50 p-10 border border-white shadow-inner h-full">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-10">Tình trạng kho hàng</h3>
              <div className="space-y-8">
                <StockIndicator label="Giày thể thao" percentage={85} color="bg-emerald-500" />
                <StockIndicator label="Áo Hoodie" percentage={40} color="bg-amber-500" />
                <StockIndicator label="Phụ kiện" percentage={12} color="bg-rose-500" />
                <StockIndicator label="Quần Jean" percentage={65} color="bg-blue-500" />
              </div>
              <button className="w-full mt-12 btn-secondary py-5 font-black uppercase text-[10px] tracking-widest active:scale-95">
                 Kiểm kê toàn bộ
              </button>
           </div>
        </div>
      </div>

      {/* Recent Orders Table Mock */}
      <div className="premium-card bg-white border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-secondary/10">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Danh sách giao dịch mới</h3>
          <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline decoration-2">Xem chi tiết</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/20">
                <th className="px-10 py-6 text-[9px] font-black text-primary/40 uppercase tracking-widest">Khách hàng</th>
                <th className="px-10 py-6 text-[9px] font-black text-primary/40 uppercase tracking-widest">Trạng thái</th>
                <th className="px-10 py-6 text-[9px] font-black text-primary/40 uppercase tracking-widest">Thời gian</th>
                <th className="px-10 py-6 text-[9px] font-black text-primary/40 uppercase tracking-widest text-right">Tổng cộng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/30">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-secondary/10 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-black uppercase border border-white shadow-sm">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-primary uppercase">Customer {i}</p>
                        <p className="text-[9px] font-black text-primary/30 uppercase tracking-tighter">ID: #{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                      Hoàn tất
                    </span>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-bold text-primary/60 uppercase">12:45 PM Hôm nay</td>
                  <td className="px-10 py-8 text-right">
                    <p className="text-xs font-black text-primary">{(Math.random() * 2000000).toLocaleString('vi-VN')} đ</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ icon: Icon, label, value, trend, isUp, color }) => (
  <div className="premium-card bg-white p-10 border border-gray-50 shadow-sm hover:shadow-premium transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{label}</p>
    <h3 className="text-4xl font-black text-primary tracking-tighter uppercase">{value}</h3>
  </div>
);

const StockIndicator = ({ label, percentage, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <p className="text-[10px] font-black text-primary uppercase tracking-widest">{label}</p>
      <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{percentage}%</p>
    </div>
    <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-secondary shadow-inner">
      <div 
        className={`h-full rounded-full ${color} transition-all duration-1000 shadow-sm`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);
