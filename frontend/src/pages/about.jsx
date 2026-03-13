import React from 'react';
import { Target, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Chất lượng hàng đầu",
      description: "Cam kết mang đến cho khách hàng những sản phẩm chính hãng với tiêu chuẩn kiểm định khắt khe nhất."
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Tận tâm phục vụ",
      description: "Luôn đặt lợi ích khách hàng lên trên hết, hỗ trợ nhiệt tình, giải quyết vấn đề nhanh chóng 24/7."
    },
    {
       icon: <ShieldCheck className="w-8 h-8 text-accent" />,
       title: "Bảo mật tuyệt đối",
       description: "Hệ thống bảo vệ dữ liệu khách hàng theo chuẩn quốc tế, đảm bảo an toàn mọi giao dịch."
    },
    {
       icon: <Zap className="w-8 h-8 text-accent" />,
       title: "Giao hàng tốc hành",
       description: "Mạng lưới đối tác vận chuyển phủ sóng toàn quốc, đảm bảo hàng đến tay khách hàng trong vòng 24-48h."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary/30 pt-24 pb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -ml-40 -mb-40 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-slideUp">
          <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 tracking-tight">Câu chuyện của chúng tôi</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Khởi nguồn từ một ước mơ đơn giản: mang trải nghiệm mua sắm trực tuyến tuyệt vời nhất, minh bạch nhất và tiện lợi nhất đến người tiêu dùng Việt Nam.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-24 transition-all">
        <div className="premium-card bg-white p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
           {[
             { label: "Khách hàng tin dùng", value: "2M+" },
             { label: "Sản phẩm chính hãng", value: "50K+" },
             { label: "Đối tác thương hiệu", value: "1,000+" },
             { label: "Tỉnh thành phủ sóng", value: "63/63" }
           ].map((stat, idx) => (
             <div key={idx} className="text-center px-4 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                <p className="text-4xl font-black text-accent mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-black text-primary tracking-tight uppercase">Giá trị cốt lõi</h2>
            <p className="text-muted-foreground font-medium italic">Những nguyên tắc định hình con đường phát triển và văn hóa phục vụ.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {coreValues.map((value, idx) => (
                <div key={idx} className="premium-card bg-white p-8 group hover:-translate-y-2 transition-all">
                   <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center mb-6 border border-secondary group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
                      {value.icon}
                   </div>
                   <h3 className="text-xl font-black text-primary mb-3 uppercase tracking-tight">{value.title}</h3>
                   <p className="text-muted-foreground font-medium leading-relaxed">{value.description}</p>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-24 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>
         <div className="max-w-3xl mx-auto px-4 relative z-10 animate-scaleIn">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">BẠN ĐÃ SẴN SÀNG TRẢI NGHIỆM?</h2>
            <p className="text-primary-foreground/60 mb-12 text-lg font-medium italic">Hàng ngàn ưu đãi và sản phẩm tuyệt vời đang chờ đón bạn.</p>
            <Link to="/shop" className="btn-accent px-12 py-5 text-lg">
               Bắt đầu mua sắm ngay
            </Link>
         </div>
      </div>
    </div>
  );
}
