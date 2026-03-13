import React, { useState, useEffect } from 'react';
import { Tag, Calendar, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import axiosClient from '@/api/axiosClient';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axiosClient.get('/promotions');
        // Handle different response structures
        const data = response.data || response || [];
        setPromotions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDiscountDisplay = (promo) => {
    if (promo.discount_type === 'percentage') {
      return `Giảm ${promo.discount_value}%`;
    }
    return `Giảm ${(promo.discount_value || 0).toLocaleString('vi-VN')}đ`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slideUp">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 text-accent rounded-[2rem] mb-6 border border-accent/20">
            <Tag className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black text-primary mb-4 tracking-tighter uppercase">Khuyến mãi & Ưu đãi</h1>
          <p className="text-lg text-muted-foreground font-medium italic">Tổng hợp các mã giảm giá mới nhất. Tận hưởng không gian mua sắm tiết kiệm.</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="premium-card bg-white p-6 h-64 border border-gray-100 shadow-sm animate-pulse">
                  <div className="w-16 h-16 bg-secondary rounded-2xl mb-4"></div>
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-1/2 mb-8"></div>
                  <div className="h-12 bg-secondary/50 rounded-xl w-full mt-auto"></div>
               </div>
             ))}
          </div>
        ) : promotions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, idx) => {
              const isActive = new Date() >= new Date(promo.startDate) && new Date() <= new Date(promo.endDate);
              const isUsedUp = promo.maxUsage && promo.usedCount >= promo.maxUsage;

              return (
                <div key={promo.id} className="group relative premium-card bg-white p-8 border hover:border-accent/40 animate-slideUp" style={{ animationDelay: `${idx * 100}ms` }}>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-16 -mt-16 z-0 group-hover:bg-accent/10 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <span className="inline-flex items-center px-3 py-1 bg-secondary text-primary text-[10px] font-black rounded-full border border-gray-100 mb-4 uppercase tracking-widest">
                         {promo.code ? 'Mã Giảm Giá' : 'Chương Trình'}
                      </span>
                      <h3 className="text-2xl font-black text-primary mb-2 leading-tight tracking-tight uppercase">{promo.name}</h3>
                      <p className="text-4xl font-black text-accent mb-4 tracking-tighter">
                        {getDiscountDisplay(promo)}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8 mt-auto">
                      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-accent" />
                        HSD: {new Date(promo.endDate).toLocaleDateString('vi-VN')}
                      </div>
                      
                      {promo.maxUsage && (
                        <div className="w-full bg-secondary rounded-full h-2 mb-1 mt-4 overflow-hidden">
                           <div 
                              className="bg-accent h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min(100, (promo.usedCount / promo.maxUsage) * 100)}%` }}
                           ></div>
                        </div>
                      )}
                      {promo.maxUsage && <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Đã dùng {promo.usedCount}/{promo.maxUsage}</p>}
                    </div>

                    {promo.code ? (
                      <button 
                        onClick={() => handleCopyCode(promo.code)}
                        disabled={!isActive || isUsedUp}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black border-2 transition-all active:scale-[0.98] ${
                          !isActive || isUsedUp 
                            ? 'bg-secondary border-secondary text-muted-foreground cursor-not-allowed' 
                            : copiedCode === promo.code 
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : 'bg-white border-gray-100 text-primary hover:border-accent group-hover:bg-secondary/50'
                        }`}
                      >
                        <span className="font-mono text-xl tracking-widest">{promo.code}</span>
                        {copiedCode === promo.code ? (
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                             <CheckCircle2 className="w-4 h-4" /> Đã chép
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-accent">
                            <Copy className="w-4 h-4" /> Sao chép
                          </div>
                        )}
                      </button>
                    ) : (
                       <div className="w-full text-center px-6 py-4 rounded-2xl font-black bg-secondary/50 text-muted-foreground border-2 border-dashed border-gray-200 uppercase tracking-widest text-[10px]">
                          Áp dụng tự động
                       </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="premium-card bg-white p-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto animate-scaleIn">
             <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 text-muted-foreground/20">
                <AlertCircle className="w-12 h-12" />
             </div>
             <h3 className="text-3xl font-black text-primary mb-2 uppercase tracking-tight">Hiện chưa có khuyến mãi</h3>
             <p className="text-muted-foreground font-medium italic">Hãy theo dõi thường xuyên để không bỏ lỡ những siêu ưu đãi hấp dẫn sắp tới nhé!</p>
          </div>
        )}
      </div>
    </div>
  );
}
