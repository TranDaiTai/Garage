import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingCart, TrendingUp, ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";
import axiosClient from "@/api/axiosClient";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const prodRes = await axiosClient.get("/products?limit=8&sort=newest");
        if (prodRes.success) setFeaturedProducts(prodRes.data.product);

        const catRes = await axiosClient.get("/categories");
        if (catRes.success) setCategories(catRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu trang chủ:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const features = [
    { icon: <Truck className="w-6 h-6 text-accent" />, title: "Giao Hàng Nhanh", desc: "Miễn phí đơn hàng từ 500k" },
    { icon: <ShieldCheck className="w-6 h-6 text-accent" />, title: "Chất Lượng Cao", desc: "Cam kết 100% hàng chính hãng" },
    { icon: <Clock className="w-6 h-6 text-accent" />, title: "Hỗ Trợ 24/7", desc: "Tư vấn nhiệt tình, chu đáo" },
    { icon: <Sparkles className="w-6 h-6 text-accent" />, title: "Ưu Đãi Đặc Biệt", desc: "Nhiều chương trình hấp dẫn" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* 1. HERO SECTION - High Impact */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-8 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Bộ sưu tập mới 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Khơi Nguồn <br />
              <span className="text-accent underline decoration-white/20 underline-offset-8">Phong Cách</span> Mới
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-medium">
              Khám phá không gian mua sắm hiện đại với những sản phẩm được tuyển chọn kỹ lưỡng, mang lại giá trị bền vững cho cuộc sống của bạn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop" className="btn-accent flex items-center justify-center gap-2 text-lg">
                Mua Sắm Ngay <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/promotions" className="px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
                Xem Khuyến Mãi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES */}
      <section className="relative z-10 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-premium border border-gray-50 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 bg-secondary rounded-xl">
                {feature.icon}
              </div>
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">{feature.title}</h3>
              <p className="text-xs text-muted-foreground font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES CAROUSEL/GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Danh Mục Nổi Bật</h2>
            <p className="text-muted-foreground font-medium italic">Lựa chọn theo sở thích và nhu cầu của bạn</p>
          </div>
          <Link to="/shop" className="text-primary font-bold hover:text-accent flex items-center gap-2 group transition-all">
            Xem tất cả <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link 
              key={cat.id} 
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center gap-4 transition-all"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-secondary border border-gray-100 flex items-center justify-center p-8 group-hover:shadow-lg group-hover:border-accent/30 transition-all">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <Sparkles className="w-12 h-12 text-primary/20" />
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
              </div>
              <h3 className="font-bold text-foreground text-center group-hover:text-primary transition-colors">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight flex items-center justify-center md:justify-start gap-3">
                <TrendingUp className="w-8 h-8 text-accent" />
                Sản Phẩm Mới Nhất
              </h2>
              <p className="text-muted-foreground font-medium">Những siêu phẩm vừa cập bến thị trường</p>
            </div>
            <Link to="/shop?sort=newest" className="hidden md:flex text-primary font-bold hover:text-accent items-center gap-2 group transition-all">
              Bộ sưu tập <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse bg-white rounded-3xl h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="premium-card group h-full flex flex-col overflow-hidden bg-white">
                  <Link to={`/product/${product.slug || product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img 
                      src={product.images?.[0]?.imageUrl || "https://placehold.co/600x800/png?text=Product+Image"} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.originalPrice && (
                       <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                         Top Deal
                       </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  </Link>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                       <span>{product.category?.name || "Premium"}</span>
                       <div className="flex items-center gap-1 text-accent">
                         <Star className="w-3 h-3 fill-accent" /> {product.rating || 5.0}
                       </div>
                    </div>
                    
                    <Link to={`/product/${product.slug || product.id}`} className="font-extrabold text-primary transition-colors hover:text-accent line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </Link>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                       <div className="flex flex-col">
                         <span className="font-black text-primary text-xl">
                           {Number(product.price).toLocaleString('vi-VN')}đ
                         </span>
                         {product.originalPrice && (
                           <span className="text-xs text-muted-foreground line-through">
                             {Number(product.originalPrice).toLocaleString('vi-VN')}đ
                           </span>
                         )}
                       </div>
                       <button 
                          onClick={(e) => { e.preventDefault(); addItem(product); }}
                          className="bg-secondary text-primary p-3 rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:rotate-6 active:scale-90"
                          title="Thêm vào giỏ"
                       >
                         <ShoppingCart className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 md:hidden text-center">
            <Link to="/shop" className="btn-primary w-full">Xem Tất Cả Sản Phẩm</Link>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER / CALL TO ACTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-12 md:p-24 text-center">
           <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 contrast-125"
              alt="CTA Background"
           />
           <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Tham Gia Ngay Để Nhận <span className="text-accent underline decoration-accent/30">Voucher 20%</span>
              </h2>
              <p className="text-primary-foreground/70 text-lg font-medium">
                Đăng ký nhận bản tin để không bỏ lỡ những bộ sưu tập mới nhất và ưu đãi độc quyền từ EcoMarket.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <input 
                    type="email" 
                    placeholder="Nhập email của bạn..." 
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white focus:text-primary outline-none transition-all"
                 />
                 <button type="submit" className="btn-accent whitespace-nowrap px-10">Đăng ký</button>
              </form>
           </div>
        </div>
      </section>
    </main>
  );
}

