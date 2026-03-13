import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <div className="premium-card group h-full flex flex-col overflow-hidden bg-white">
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
        <Link to={`/product/${product.slug || product.id}`} className="block h-full">
          <img
            src={product.images?.[0]?.imageUrl || product.image || "https://placehold.co/600x800/png?text=Product"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-destructive text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {product.soldCount > 500 && (
            <span className="bg-accent text-accent-foreground text-[10px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-wider">
              Bán chạy
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => addItem(product)}
            className="p-3 bg-white text-primary rounded-full shadow-xl hover:bg-accent hover:text-white transition-all transform hover:scale-110 active:scale-95 translate-y-4 group-hover:translate-y-0 duration-300"
            title="Thêm vào giỏ"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link 
            to={`/product/${product.slug || product.id}`}
            className="p-3 bg-white text-primary rounded-full shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95 translate-y-4 group-hover:translate-y-0 delay-75 duration-300"
            title="Xem chi tiết"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span className="truncate max-w-[120px]">{product.category?.name || product.category || "General"}</span>
          <div className="flex items-center gap-1 text-accent shrink-0">
            <Star className="w-3 h-3 fill-accent" /> {product.rating || 5.0}
          </div>
        </div>

        <Link
          to={`/product/${product.slug || product.id}`}
          className="font-extrabold text-primary hover:text-accent transition-colors line-clamp-2 min-h-[2.5rem] leading-tight"
        >
          {product.name}
        </Link>

        {/* Price Area */}
        <div className="mt-auto pt-4 flex flex-wrap items-end gap-2 border-t border-gray-50">
          <span className="font-black text-primary text-lg leading-none">
            {Number(product.price).toLocaleString("vi-VN")}đ
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through font-medium mb-0.5">
              {Number(product.originalPrice).toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function getDiscount(original, price) {
  if (!original || !price || original <= price) return 0;
  return Math.floor(((original - price) / original) * 100);
}

