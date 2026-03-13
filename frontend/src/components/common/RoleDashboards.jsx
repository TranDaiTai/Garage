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
} from "recharts"
import {
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  MapPin,
  Phone,
  Edit3,
  Camera,
  Users,
  BarChart3,
  Package,
} from "lucide-react"
import { Card, Badge } from "@/components/common/UI"
import { Button } from "../ui/button"

/* --- MOCK DATA --- */
const mockOrders = [
  { id: "#ECO-2025-001", service: "Laptop Gaming ASUS ROG Strix", date: "24/12/2025", status: "Completed", total: 35000000 },
  { id: "#ECO-2025-002", service: "iPhone 15 Pro Max 256GB", date: "20/12/2025", status: "Completed", total: 28500000 },
  { id: "#ECO-2025-003", service: "Bàn phím cơ Custom KBD75", date: "15/12/2025", status: "In Progress", total: 4200000 },
   { id: "#ECO-2025-004", service: "Màn hình Dell UltraSharp 27", date: "24/12/2025", status: "Completed", total: 11500000 },
  { id: "#ECO-2025-005", service: "Chuột Logitech G Pro X", date: "20/12/2025", status: "Completed", total: 2850000 },
  { id: "#ECO-2025-006", service: "Tai nghe Sony WH-1000XM5", date: "15/12/2025", status: "In Progress", total: 8200000 },
]

const mockTasks = [
  {
    id: "T-101",
    title: "Xác nhận đơn hàng #ECO-2025-099",
    customer: "Nguyễn Văn A",
    status: "In Progress",
    priority: "High",
    dueTime: "14:00 Today",
  },
  {
    id: "T-102",
    title: "Chuẩn bị hàng: Laptop ASUS",
    customer: "Trần Thị B",
    status: "Todo",
    priority: "Medium",
    dueTime: "16:30 Today",
  },
  {
    id: "T-103",
    title: "Giao hàng cho đơn vị vận chuyển",
    customer: "Lê Văn C",
    status: "Done",
    priority: "Low",
    dueTime: "10:00 Today",
  },
]

const chartData = [
  { name: "T1", rev: 4000 },
  { name: "T2", rev: 3000 },
  { name: "T3", rev: 2000 },
  { name: "T4", rev: 2780 },
  { name: "T5", rev: 1890 },
  { name: "T6", rev: 2390 },
  { name: "T7", rev: 3490 },
]

/* --- USER VIEW --- */
export const UserDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header Card */}
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-600" />
                Đơn hàng & Dịch vụ gần đây
            </h3>
            <div className="space-y-4">
                {mockOrders.map(order => (
                    <Card key={order.id} className="p-4 transition-all hover:shadow-md cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Car size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{order.service}</h4>
                                <p className="text-xs text-gray-500">{order.id} • {order.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-primary-700">{order.total.toLocaleString()}đ</p>
                            <Badge status={order.status} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        {/* My Vehicle Status (Concept) */}
        <div className="space-y-6">
             <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Car className="w-5 h-5 mr-2 text-primary-600" />
                Xe của tôi
            </h3>
            <Card className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold">Mazda CX-5</h4>
                        <p className="text-gray-400 text-sm">51K - 123.45</p>
                    </div>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">Premium</span>
                </div>
                <div className="space-y-3 mt-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Đăng kiểm</span>
                        <span className="text-green-400">Còn hạn (T5/2026)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Bảo hiểm</span>
                        <span className="text-yellow-400">Sắp hết hạn (15 ngày)</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Lần bảo dưỡng tới</span>
                        <span className="text-white">5,000 km nữa</span>
                    </div>
                </div>
                <Button className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-100 border-none">
                    Đặt lịch bảo dưỡng
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
};

/* --- STAFF VIEW --- */
export const StaffDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 flex items-center space-x-4 border-l-4 border-l-blue-500">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600"><Clock size={24}/></div>
                <div>
                    <p className="text-sm text-gray-500">Công việc hôm nay</p>
                    <h3 className="text-2xl font-bold">12</h3>
                </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4 border-l-4 border-l-green-500">
                <div className="p-3 bg-green-50 rounded-full text-green-600"><CheckCircle2 size={24}/></div>
                <div>
                    <p className="text-sm text-gray-500">Đã hoàn thành</p>
                    <h3 className="text-2xl font-bold">8</h3>
                </div>
            </Card>
            <Card className="p-4 flex items-center space-x-4 border-l-4 border-l-orange-500">
                <div className="p-3 bg-orange-50 rounded-full text-orange-600"><AlertCircle size={24}/></div>
                <div>
                    <p className="text-sm text-gray-500">Cần xử lý gấp</p>
                    <h3 className="text-2xl font-bold">2</h3>
                </div>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Danh sách công việc</h3>
                        <Button variant="ghost" className="text-xs">Xem tất cả</Button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {mockTasks.map(task => (
                            <div key={task.id} className="p-4 hover:bg-gray-50 flex items-center justify-between group">
                                <div className="flex items-start space-x-3">
                                    <input type="checkbox" className="mt-1 w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"/>
                                    <div>
                                        <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{task.title}</p>
                                        <p className="text-sm text-gray-500">Khách: {task.customer} • <span className="text-red-500">{task.dueTime}</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge status={task.priority} />
                                    <Badge status={task.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            
            <div>
                 <Card className="h-full p-5">
                    <h3 className="font-bold text-gray-900 mb-4">Thông báo nội bộ</h3>
                    <div className="space-y-4">
                        <div className="flex space-x-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">Họp giao ban kỹ thuật</p>
                                <p className="text-xs text-gray-500">08:00 AM - Phòng họp 2</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">Cập nhật quy trình bảo dưỡng mới</p>
                                <p className="text-xs text-gray-500">Vui lòng xem tài liệu đính kèm</p>
                            </div>
                        </div>
                         <div className="flex space-x-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">Thưởng KPI tháng 12</p>
                                <p className="text-xs text-gray-500">Đã cập nhật bảng lương</p>
                            </div>
                        </div>
                    </div>
                 </Card>
            </div>
        </div>
    </div>
  );
};

/* --- ADMIN VIEW --- */
export const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">2.4 Tỷ</h3>
                        <span className="text-green-500 text-xs font-medium flex items-center mt-1">
                            ↑ 12% so với tháng trước
                        </span>
                    </div>
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        <DollarSign size={20} />
                    </div>
                </div>
            </Card>
            <Card className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Đơn hàng mới</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">156</h3>
                         <span className="text-green-500 text-xs font-medium flex items-center mt-1">
                            ↑ 5% so với tuần trước
                        </span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <ShoppingCart size={20} />
                    </div>
                </div>
            </Card>
            <Card className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Khách hàng mới</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">48</h3>
                         <span className="text-red-500 text-xs font-medium flex items-center mt-1">
                            ↓ 2% so với tuần trước
                        </span>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                        <Users size={20} />
                    </div>
                </div>
            </Card>
             <Card className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Dịch vụ đang chạy</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                         <span className="text-gray-400 text-xs font-medium flex items-center mt-1">
                            Hoạt động bình thường
                        </span>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Car size={20} />
                    </div>
                </div>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Biểu đồ doanh thu</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey="rev" stroke="#f57c00" strokeWidth={3} dot={{ r: 4, fill: '#f57c00' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

             <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Dịch vụ phổ biến</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            {name: 'Bảo dưỡng', val: 65},
                            {name: 'Sửa chữa', val: 45},
                            {name: 'Sơn xe', val: 30},
                            {name: 'Rửa xe', val: 80},
                            {name: 'Phụ tùng', val: 55},
                        ]}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                            <Bar dataKey="val" fill="#1e293b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>

         <Card className="overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Quản lý người dùng gần đây</h3>
                <Button variant="outline" className="text-xs h-8">Xuất báo cáo</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date Added</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3].map(i => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                    <span className="font-medium text-gray-900">User {i}</span>
                                </td>
                                <td className="px-6 py-4">User</td>
                                <td className="px-6 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">Active</span></td>
                                <td className="px-6 py-4 text-gray-500">20/12/2025</td>
                                <td className="px-6 py-4 text-right text-primary-600 cursor-pointer hover:underline">Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};
