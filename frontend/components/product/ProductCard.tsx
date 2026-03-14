"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, ShoppingCart, Heart, Eye, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductCard({ product, index }: { product: any; index: number }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      icon: '💚',
      style: { background: '#4F6F52', color: '#fff', borderRadius: '16px', fontWeight: 'bold' },
      duration: 2000,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group premium-card bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[4/5] bg-secondary/30 rounded-2xl overflow-hidden mb-4 md:mb-6">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image 
            src={getImageUrl(product.images?.[0]?.imageUrl || product.image)} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wide text-primary shadow-sm z-10">
           {product.category?.name || "Premium"}
        </div>

        {/* Hover Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center gap-3 z-20"
            >
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                onClick={handleAddToCart}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl ${
                  added ? 'bg-accent text-white scale-110' : 'bg-white text-primary hover:bg-accent hover:text-white'
                }`}
                title="Thêm vào giỏ"
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              </motion.button>
              
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl"
                title="Yêu thích"
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              <Link href={`/products/${product.slug}`}>
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl"
                  title="Xem chi tiết"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-1 text-[#4F6F52]">
              <Star className="w-3 h-3 fill-[#4F6F52]" />
              <span className="text-xs font-bold">4.9</span>
           </div>
           <span className="text-xs font-medium text-primary/60">#ECO-{product.id}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base md:text-xl font-black text-primary tracking-tight uppercase group-hover:text-[#4F6F52] transition-colors leading-tight line-clamp-2">
              {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <p className="text-xl md:text-2xl font-black text-primary tracking-tighter">
            {formatCurrency(product.price)}
          </p>
          <Link 
            href={`/products/${product.slug}`}
            className="text-xs font-bold uppercase tracking-widest text-primary/50 group-hover:text-accent transition-colors flex items-center gap-2"
          >
            Chi tiết <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
