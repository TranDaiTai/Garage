import { Star, ShoppingCart, Heart, Share2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const ProductInfo = ({ product }) => {
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const formatPrice = (price) => {
    return Number(price).toLocaleString('vi-VN') + "đ";
  };

  const handleAddToCart = async () => {
    await addItem(product, quantity);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const discount = product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div className="space-y-6 flex flex-col h-full animate-fadeIn">
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
           <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
             Gian Hàng Chính Hãng
           </span>
           <button className="text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1 text-sm">
              <Share2 className="w-4 h-4" /> Chia sẻ
           </button>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 text-sm divide-x divide-gray-200">
          <div className="flex items-center gap-1.5 text-orange-500">
            <span className="font-bold">{product.rating || 5.0}</span>
            <Star className="w-4 h-4 fill-orange-500" />
          </div>
          <span className="text-gray-500 pl-4">
             {product.reviewsCount || 12} Đánh giá
          </span>
          <span className="text-gray-500 pl-4">
             {product.soldCount || 150} Đã bán
          </span>
        </div>
      </div>

      {/* Price Box */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-2 border border-gray-100">
        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-3xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-sm">-{discount}%</span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">Gì cũng rẻ - Hoàn tiền 120% nếu ở đâu rẻ hơn.</p>
      </div>

      {/* Attributes/Variants (Mock if missing) */}
      <div className="space-y-4 pt-2">
         {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-4">
               <span className="text-sm text-gray-500 w-24">Màu Sắc</span>
               <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                     <button key={idx} className="px-3 py-1.5 border border-gray-200 rounded-sm text-sm hover:border-primary focus:border-primary focus:text-primary transition-colors">
                        {color}
                     </button>
                  ))}
               </div>
            </div>
         )}
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 w-24">Số Lượng</span>
            <div className="flex items-center border border-gray-200 rounded-sm bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 h-10 text-center text-sm font-medium border-x border-gray-200 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                <Plus className="w-4 h-4" />
                </button>
            </div>
            {product.stock !== undefined && <span className="text-sm text-gray-400">{product.stock} sản phẩm có sẵn</span>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            className="flex-1 py-3.5 px-4 bg-primary/10 border border-primary/50 text-primary font-medium rounded-sm hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
            Thêm Vào Giỏ Hàng
          </button>
          <button
            className="flex-1 py-3.5 px-4 bg-primary text-white font-medium rounded-sm hover:opacity-90 transition-all shadow-sm"
          >
            Mua Ngay
          </button>
        </div>

        {showAddedNotification && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-sm animate-fadeIn flex items-center gap-2">
            Đã thêm sản phẩm vào giỏ hàng thành công.
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductInfo;

