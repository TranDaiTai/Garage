import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/api/axiosClient";
import { ArrowLeft, MapPin, CreditCard, Receipt, CheckCircle, Package, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const shippingCost = items?.length > 0 ? 30000 : 0;
  const finalTotal = totalPrice + shippingCost;

  useEffect(() => {
    // Pre-fill user data if available
    if (user) {
      if (user.phone) setPhoneNumber(user.phone);
      if (user.address) setShippingAddress(user.address);
    }
  }, [user]);

  // Redirect if cart is empty and not in success state
  useEffect(() => {
    if (items?.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [items, navigate, orderSuccess]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress || !phoneNumber) {
      alert("Vui lòng nhập đầy đủ địa chỉ giao hàng và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare order data matching backend expectations
      const orderData = {
        orderItems: items.map(item => ({
          productId: item.product?.id || item.productId,
          quantity: item.quantity,
          price: item.product?.price || 0
        })),
        shippingAddress,
        phoneNumber,
        paymentMethod,
        totalAmount: finalTotal,
        shippingFee: shippingCost
      };

      const res = await axiosClient.post("/orders", orderData);
      
      if (res.success || res.status === 'success' || res.data) {
         setCreatedOrder(res.data || res);
         setOrderSuccess(true);
         clearCart();
         window.scrollTo(0, 0);
      } else {
         throw new Error("Tạo đơn hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert(error.response?.data?.message || "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-20">
        <div className="premium-card bg-white p-12 md:p-16 max-w-2xl w-full text-center space-y-12 animate-slideUp relative overflow-hidden">
           {/* Celebration Effect Background */}
           <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
           <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

           <div className="space-y-6 relative z-10">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                 <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-primary tracking-tight uppercase">
                  ĐẶT HÀNG THÀNH CÔNG!
                </h1>
                <p className="text-muted-foreground font-medium italic">
                  Cảm ơn bạn đã tin tưởng lựa chọn EcoMarket. Đơn hàng của bạn đang được chúng tôi chăm chút chuẩn bị.
                </p>
              </div>
           </div>
           
           <div className="bg-secondary/30 rounded-[2rem] p-8 md:p-10 text-left space-y-8 border border-white relative z-10 shadow-inner">
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mã đơn hàng</p>
                    <p className="font-black text-primary text-lg">#{createdOrder?.id || createdOrder?.orderId || "ORD-" + Math.floor(Math.random() * 1000000)}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Phương thức</p>
                    <p className="font-black text-primary uppercase text-sm">{paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản / Thẻ'}</p>
                 </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-white pt-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">Tổng cộng đã thanh toán</p>
                    <span className="text-3xl font-black text-primary tracking-tighter">{finalTotal.toLocaleString("vi-VN")}đ</span>
                 </div>
                 <div className="bg-white/50 px-4 py-2 rounded-full border border-white">
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Đã xác nhận
                    </span>
                 </div>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button
                onClick={() => navigate("/profile/orders")}
                className="flex-1 btn-primary py-5 font-black uppercase tracking-widest active:scale-95"
              >
                Theo dõi đơn hàng
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="flex-1 btn-secondary py-5 font-black uppercase tracking-widest active:scale-95"
              >
                Tiếp tục mua sắm
              </button>
           </div>
           
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
              Một bản sao vận đơn đã được gửi tới email của bạn
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
           onClick={() => navigate("/cart")}
           className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent mb-12 transition-all"
        >
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại giỏ hàng
        </button>
        
        <div className="flex flex-col gap-4 mb-20">
           <h1 className="text-5xl font-black text-primary tracking-tighter uppercase animate-slideUp">
             THANH TOÁN
           </h1>
           <div className="h-1.5 w-24 bg-accent rounded-full animate-slideUp"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-12 animate-slideUp">
            
            {/* Delivery Info */}
            <section className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center font-black">1</div>
                  <h2 className="text-2xl font-black text-primary tracking-tight uppercase">Thông tin giao hàng</h2>
               </div>
               
               <div className="premium-card bg-white p-8 md:p-12 space-y-8">
                  <form className="space-y-6" id="checkout-form" onSubmit={handlePlaceOrder}>
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Họ và tên người nhận</label>
                           <input 
                             type="text" 
                             defaultValue={user?.name || user?.username || ""} 
                             className="w-full bg-secondary/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent font-bold text-primary placeholder:text-muted-foreground/40 transition-all outline-none"
                             placeholder="VD: Nguyễn Văn A"
                             required
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Số điện thoại liên hệ</label>
                           <input 
                             type="tel" 
                             value={phoneNumber}
                             onChange={(e) => setPhoneNumber(e.target.value)}
                             className="w-full bg-secondary/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent font-bold text-primary placeholder:text-muted-foreground/40 transition-all outline-none"
                             placeholder="VD: 090xxxxxxx"
                             required
                           />
                        </div>
                     </div>
                     
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Địa chỉ nhận hàng (Chi tiết)</label>
                        <textarea 
                           value={shippingAddress}
                           onChange={(e) => setShippingAddress(e.target.value)}
                           rows="3"
                           className="w-full bg-secondary/50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent font-bold text-primary placeholder:text-muted-foreground/40 transition-all outline-none resize-none"
                           placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                           required
                        ></textarea>
                     </div>
                  </form>
               </div>
            </section>

            {/* Payment Methods */}
            <section className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center font-black">2</div>
                  <h2 className="text-2xl font-black text-primary tracking-tight uppercase">Phương thức thanh toán</h2>
               </div>
               
               <div className="grid md:grid-cols-2 gap-6">
                  <label className={`relative group cursor-pointer transition-all ${paymentMethod === 'COD' ? 'scale-[1.02]' : 'hover:translate-y-[-4px]'}`}>
                     <input 
                       type="radio" 
                       name="payment" 
                       value="COD" 
                       checked={paymentMethod === 'COD'} 
                       onChange={() => setPaymentMethod('COD')}
                       className="sr-only"
                     />
                     <div className={`premium-card p-8 h-full flex flex-col gap-6 items-start border-2 transition-all duration-300 ${paymentMethod === 'COD' ? 'border-accent bg-white shadow-2xl' : 'border-transparent bg-white hover:border-gray-100'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${paymentMethod === 'COD' ? 'bg-accent text-white' : 'bg-secondary text-primary'}`}>
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                           <span className="block text-primary font-black uppercase tracking-tight">Thanh toán (COD)</span>
                           <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Trả tiền mặt ngay khi bạn nhận được hàng tận tay.</span>
                        </div>
                        {paymentMethod === 'COD' && (
                           <div className="absolute top-4 right-4 animate-fadeIn">
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                 <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                           </div>
                        )}
                     </div>
                  </label>
                  
                  <label className={`relative group cursor-pointer transition-all ${paymentMethod === 'VNPAY' ? 'scale-[1.02]' : 'hover:translate-y-[-4px]'}`}>
                     <input 
                       type="radio" 
                       name="payment" 
                       value="VNPAY" 
                       checked={paymentMethod === 'VNPAY'} 
                       onChange={() => setPaymentMethod('VNPAY')}
                       className="sr-only"
                     />
                     <div className={`premium-card p-8 h-full flex flex-col gap-6 items-start border-2 transition-all duration-300 ${paymentMethod === 'VNPAY' ? 'border-accent bg-white shadow-2xl' : 'border-transparent bg-white hover:border-gray-100'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${paymentMethod === 'VNPAY' ? 'bg-accent text-white' : 'bg-secondary text-primary'}`}>
                           <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                           <span className="block text-primary font-black uppercase tracking-tight">Thanh toán VNPay</span>
                           <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Sử dụng ATM, QR Code hoặc các loại thẻ quốc tế.</span>
                        </div>
                        {paymentMethod === 'VNPAY' && (
                           <div className="absolute top-4 right-4 animate-fadeIn">
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                 <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                           </div>
                        )}
                     </div>
                  </label>
               </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 animate-slideUp delay-200">
            <div className="premium-card p-10 bg-white border border-gray-50 flex flex-col gap-10">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-black text-primary uppercase tracking-tight">Tóm tắt đơn hàng</h2>
                 <span className="bg-secondary px-4 py-1.5 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">{items.length} món</span>
              </div>

              <div className="space-y-6 max-h-[35vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-secondary">
                 {items.map((item) => (
                    <div key={item.product?.id || item.productId} className="flex gap-6 items-center group">
                       <div className="w-20 h-20 bg-secondary/30 rounded-2xl overflow-hidden border border-gray-50 flex-shrink-0 p-2 flex items-center justify-center">
                          <img 
                            src={item.product?.images?.[0]?.imageUrl || "https://placehold.co/100x100/png?text=Item"} 
                            alt={item.product?.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                          />
                       </div>
                       <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-sm font-black text-primary line-clamp-1 uppercase tracking-tight">{item.product?.name}</h4>
                          <div className="flex justify-between items-center">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">Số lượng: {item.quantity}</p>
                             <p className="text-sm font-black text-primary tracking-tighter">{(Number(item.product?.price || 0) * item.quantity).toLocaleString("vi-VN")}đ</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Tạm tính</span>
                  <span className="text-primary text-sm">
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Vận chuyển</span>
                  <span className="text-primary text-sm">
                    {shippingCost > 0 ? `${shippingCost.toLocaleString("vi-VN")}đ` : "Miễn phí"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">Tổng cộng cuối cùng</span>
                    <span className="text-4xl font-black text-primary tracking-tighter">
                      {finalTotal.toLocaleString("vi-VN")}đ
                    </span>
                 </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full btn-primary py-6 font-black uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group"
              >
                {isSubmitting ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     Đang xử lý giao dịch...
                   </>
                ) : (
                   <>
                     Xác nhận đặt hàng <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                   </>
                )}
              </button>
              
              <div className="pt-4 text-center">
                 <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em] leading-relaxed">
                    Bằng việc nhấn đặt hàng, bạn đồng ý với chính sách bảo mật và điều kiện dịch vụ của EcoMarket.
                 </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
