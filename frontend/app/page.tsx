"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { useRef } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => productService.getCategories(),
  });

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  const { data: productsData = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => productService.getAllProducts("limit=10"),
  });

  const featuredProducts = Array.isArray(productsData) ? productsData : [];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-gray-50/30">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[820px] bg-accent/5 rounded-full blur-[150px] -mr-96 -mt-96 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-105">
               <Sparkles className="w-4 h-4 text-accent" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Bộ sưu tập 2026 đã sẵn sàng</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-7xl md:text-8xl font-bold text-primary tracking-tight leading-[1.05]">
                Nâng Tầm <br /> 
                <span className="text-accent italic font-serif font-medium">Phong Cách</span> <br />
                Bền Vững
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground font-medium italic max-w-lg leading-relaxed opacity-80">
              "EcoMarket không chỉ là mua sắm, đó là tuyên ngôn về lối sống hiện đại và trách nhiệm với môi trường."
            </p>

            <div className="flex items-center gap-8 pt-4">
               <Link href="/shop" className="btn-primary px-10 py-5 flex items-center gap-4 group">
                  Khám phá ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link 
                href="/about" 
                className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-primary group/cta py-2"
               >
                  Tìm hiểu thêm
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 origin-left" />
               </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block relative w-full aspect-[4/5]"
          >
            <div className="w-full h-full bg-gradient-to-tr from-secondary/30 to-white rounded-3xl border border-white shadow-2xl relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Fashion" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-95"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
            </div>
            {/* Decorative Label */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass-effect p-6 rounded-2xl shadow-2xl z-20 border-white/50"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Luxury Eco Fashion</p>
              <p className="text-[8px] font-semibold text-accent uppercase tracking-widest mt-1">Sustainably Crafted</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Categories Section */}
      <motion.section {...fadeUp} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-primary tracking-tight leading-none uppercase">
                Danh mục <br /> <span className="text-accent italic font-serif font-medium lowercase">xu hướng</span>
              </h2>
              <p className="text-muted-foreground font-medium text-lg italic opacity-75 leading-relaxed">Khám phá phong cách qua các bộ sưu tập đặc sắc</p>
            </div>
            <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 hover:text-accent transition-colors flex items-center gap-3 group">
              Xem tất cả danh mục <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[700px]">
            {categories.slice(0, 5).map((category: any, i: number) => {
              const bentoClasses = [
                "md:col-span-2 md:row-span-2", // 0
                "md:col-span-2 md:row-span-1", // 1
                "md:col-span-1 md:row-span-1", // 2
                "md:col-span-1 md:row-span-1", // 3
                "md:col-span-2 md:row-span-1", // 4
              ][i] || "col-span-1 row-span-1";

              return (
                <Link 
                  key={category.id}
                  href={`/shop?category=${category.id}`}
                  className={`${bentoClasses} group relative rounded-2xl overflow-hidden bg-secondary shadow-sm hover:shadow-2xl transition-all duration-700`}
                >
                  <img 
                    src={category.image || `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-10 left-10 text-white space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Shop collection</p>
                    <h3 className="text-2xl font-bold tracking-tight uppercase">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Featured Products Carousel */}
      <motion.section {...fadeUp} className="py-24 bg-secondary/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-3">
              <h2 className="text-5xl font-bold text-primary tracking-tight leading-none uppercase">
                Sản phẩm <br /> <span className="text-accent italic font-serif font-medium lowercase">nổi bật</span>
              </h2>
              <p className="text-muted-foreground font-medium text-lg italic opacity-75">Những thiết kế được yêu thích nhất mùa này</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={scrollLeft}
                className="w-14 h-14 rounded-full border border-primary/5 bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-14 h-14 rounded-full border border-primary/5 bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
          >
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any, index: number) => (
                <div key={product.id} className="min-w-[320px] md:min-w-[380px] snap-start">
                  <ProductCard product={product} index={index} />
                </div>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[320px] bg-white/50 animate-pulse rounded-3xl h-[450px]" />
              ))
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              href="/shop" 
              className="group relative inline-flex items-center gap-12 px-12 py-6 bg-primary text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] relative z-10">
                Khám phá toàn bộ cửa hàng
              </span>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative z-10 group-hover:bg-white group-hover:text-primary transition-all duration-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Social Trust */}
      <motion.section {...fadeUp} className="py-24 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: ShieldCheck, label: "Bảo hành 12 tháng", desc: "Chính sách đổi trả linh hoạt" },
            { icon: Zap, label: "Giao hàng siêu tốc", desc: "Nhận hàng trong 2h nội thành" },
            { icon: Sparkles, label: "Chất liệu Organic", desc: "Cam kết an toàn tuyệt đối" },
            { icon: ShoppingBag, label: "Đặc quyền hội viên", desc: "Ưu đãi lên đến 20%" }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-6 group hover:translate-y-[-5px] transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                <feature.icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">{feature.label}</h4>
                <p className="text-[10px] font-medium text-muted-foreground italic leading-relaxed max-w-[150px] mx-auto opacity-70 uppercase">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Footer />
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .shadow-premium {
          box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </main>
  );
}
