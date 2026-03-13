/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartEmpty } from "@/components/common/CartEmpty";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items = [], removeItem, updateQuantity, clearCart, totalPrice = 0, isLoading } = useCart();
  const navigate = useNavigate();

  const shippingCost = items?.length > 0 ? 30000 : 0;
  const finalTotal = totalPrice + shippingCost;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
         <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium tracking-wide">Đang tải giỏ hàng...</p>
         </div>
      </div>
    );
  }

  if (items?.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-full shadow-sm border border-gray-100 mb-6">
           <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" className="w-48 h-48 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
           Thêm sản phẩm vào giỏ và quay lại đây để hoàn tất quá trình mua sắm nhé!
        </p>
        <Link
          to="/shop"
          className="bg-blue-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-background pb-32 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fadeIn">
           <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight uppercase">
                Giỏ Hàng Của Bạn
              </h1>
              <p className="text-muted-foreground font-medium italic">
                 Bạn có <span className="text-primary font-black not-italic">{items.length} món đồ</span> tuyệt vời đang chờ thanh toán
              </p>
           </div>
           
           <button
             onClick={() => clearCart()}
             className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-full transition-all"
           >
             <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả giỏ hàng
           </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6 animate-slideUp">
            {items.map((item, idx) => (
              <div
                key={item.product?.id || item.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="premium-card bg-white p-6 md:p-8 flex flex-col md:flex-row gap-8 relative group overflow-hidden animate-slideUp"
              >
                {/* Product Image Area */}
                <div className="w-full md:w-40 h-40 shrink-0 bg-secondary/50 rounded-3xl p-4 flex items-center justify-center overflow-hidden border border-gray-50 relative">
                  <img
                    src={item.product?.images?.[0]?.imageUrl || "https://placehold.co/400x400/png?text=Product"}
                    alt={item.product?.name || "Product"}
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                  <Link 
                    to={`/product/${item.product?.slug || item.product?.id || item.productId}`}
                    className="absolute inset-0 z-10"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <Link
                        to={`/product/${item.product?.slug || item.product?.id || item.productId}`}
                        className="text-xl font-black text-primary hover:text-accent transition-colors line-clamp-2 leading-tight uppercase tracking-tight"
                      >
                        {item.product?.name || "Premium Collection Item"}
                      </Link>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                         DANH MỤC: {item.product?.category?.name || "SẢN PHẨM"}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.product?.id || item.productId)}
                      className="p-3 bg-secondary/50 text-muted-foreground hover:bg-red-500 hover:text-white rounded-2xl transition-all active:scale-90"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                     {/* Quality Control */}
                    <div className="flex items-center p-1 bg-secondary rounded-2xl border border-secondary shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.product?.id || item.productId, (item.quantity || 1) - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl text-primary font-black transition-all active:scale-90"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity || 1}
                        readOnly
                        className="w-12 text-center bg-transparent font-black text-primary text-lg focus:outline-none"
                      />
                      <button
                        onClick={() => updateQuantity(item.product?.id || item.productId, (item.quantity || 1) + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl text-primary font-black transition-all active:scale-90"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Thành tiền</p>
                       <p className="text-2xl font-black text-primary tracking-tighter">
                         {((item.product?.price || 0) * (item.quantity || 1)).toLocaleString("vi-VN")}đ
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors pt-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Tiếp tục mua sắm thêm đồ đẹp
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 animate-slideUp delay-200">
            <div className="premium-card p-10 bg-primary rounded-[2.5rem] text-white space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <ShoppingCart className="w-32 h-32" />
              </div>

              <div className="relative z-10 space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  TỔNG ĐƠN HÀNG
                </h2>
                <div className="h-1 w-12 bg-accent rounded-full"></div>
              </div>

              <div className="relative z-10 space-y-6 border-b border-white/10 pb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-white/50">Tạm tính ({items.length} món)</span>
                  <span className="font-black text-lg">
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-white/50">Phí vận chuyển</span>
                  <span className="font-black text-lg">
                    {shippingCost > 0 ? `${shippingCost.toLocaleString("vi-VN")}đ` : "MIỄN PHÍ"}
                  </span>
                </div>
              </div>

              <div className="relative z-10 space-y-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Tổng số tiền cần thanh toán</span>
                  <span className="text-5xl font-black tracking-tighter">
                    {finalTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    THANH TOÁN NGAY <ArrowRight className="w-5 h-5"/>
                  </button>
                  <p className="text-[10px] text-center text-white/40 font-bold uppercase tracking-widest px-4">
                    Miễn phí đổi trả trong 30 ngày cho mọi đơn hàng trên 5.000.000đ
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

