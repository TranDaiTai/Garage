"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { productService } from "@/services/productService";
import { reviewService } from "@/services/reviewService";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ShieldCheck, Zap, ArrowLeft, Star, Plus, Minus, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { formatCurrency, getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { wishlistService } from "@/services/wishlistService";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductDetails(slug as string),
    enabled: !!slug,
  });

  const productId = product?.id;

  const { data: reviewsData } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewService.getReviewsByProductId(productId),
    enabled: !!productId,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.categoryId],
    queryFn: () => productService.getAllProducts(`category=${product?.categoryId}&limit=4`),
    enabled: !!product?.categoryId,
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: any) => reviewService.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      setComment("");
      toast.success("Cảm ơn bạn đã đánh giá!");
    },
    onError: () => {
      toast.error("Không thể gửi đánh giá. Vui lòng thử lại.");
    }
  });

  const addToWishlistMutation = useMutation({
    mutationFn: () => wishlistService.addToWishlist(productId),
    onSuccess: () => toast.success("Đã thêm vào yêu thích!"),
  });

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    createReviewMutation.mutate({
      productId,
      rating,
      content: comment,
    });
  };

  if (isLoading) return <div className="min-h-screen bg-white" />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Sản phẩm không tồn tại</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-accent transition-all mb-12">
           <ArrowLeft className="w-4 h-4" /> Quay lại cửa hàng
        </Link>

        <div className="grid md:grid-cols-2 gap-20 items-start mb-32">
          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
             <div className="aspect-[4/5] bg-secondary/30 rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl relative">
                <img 
                  src={getImageUrl(product.images?.[0]?.imageUrl || product.image)} 
                  alt={product?.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-8 left-8">
                   <span className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">Premium Choice</span>
                </div>
             </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
               <div className="flex items-center gap-6">
                   <div className="flex items-center gap-1 text-accent">
                      {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= (reviewsData?.stats?.avgRating || 5) ? 'fill-accent' : 'text-gray-200'}`} />)}
                      <span className="text-[10px] font-black ml-2 text-primary">{reviewsData?.stats?.avgRating?.toFixed(1) || "5.0"} ({reviewsData?.stats?.totalReviews || 0} nhận xét)</span>
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-primary/50">SKU: ECO-{product?.id}</span>
               </div>
               
               <h1 className="text-6xl font-black text-primary tracking-tighter uppercase leading-[0.9]">{product?.name}</h1>
               <p className="text-4xl font-black text-accent tracking-tighter uppercase italic">{formatCurrency(product?.price || 0)}</p>
               <p className="text-lg text-muted-foreground font-medium italic leading-relaxed">
                  {product?.description || "Lời giải cho một lối sống hiện đại, tinh tế và trách nhiệm. Sản phẩm này được chúng tôi tuyển chọn kỹ lưỡng để mang lại giá trị bền vững nhất cho bạn."}
               </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Số lượng</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-secondary rounded-2xl p-2 border border-gray-50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-white rounded-xl transition-all"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-black text-primary">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-white rounded-xl transition-all"><Plus className="w-4 h-4" /></button>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground italic uppercase">Còn lại: {product?.stock || 50} sản phẩm</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-8 border-y border-gray-100">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black uppercase tracking-widest">Bảo hành</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">12 Tháng tận nơi</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary"><Zap className="w-5 h-5" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black uppercase tracking-widest">Vận chuyển</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Miễn phí toàn quốc</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-6 flex items-center justify-center gap-4 group"
               >
                  Thêm vào giỏ hàng <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
               </button>
               <button 
                onClick={() => addToWishlistMutation.mutate()}
                className="w-20 h-20 rounded-[2rem] border-2 border-gray-100 flex items-center justify-center text-primary/40 hover:text-red-500 hover:border-red-50 hover:bg-red-50 transition-all"
               >
                  <Heart className="w-6 h-6" />
               </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Đánh giá <br /> <span className="text-accent italic font-serif">Khách hàng</span></h2>
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-black text-primary">{reviewsData?.stats?.avgRating?.toFixed(1) || "5.0"}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-accent">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-accent" />)}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dựa trên {reviewsData?.stats?.totalReviews || 0} lượt đánh giá</p>
                  </div>
                </div>
              </div>

              {/* Review Form */}
              <form onSubmit={handleSubmitReview} className="premium-card p-8 bg-secondary/30 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest">Viết đánh giá của bạn</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(i => (
                    <button type="button" key={i} onClick={() => setRating(i)}>
                      <Star className={`w-6 h-6 ${i <= rating ? 'fill-accent text-accent' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  className="w-full h-32 p-4 bg-white rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm italic"
                />
                <button 
                  type="submit" 
                  disabled={createReviewMutation.isPending || !comment}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                >
                  Gửi nhận xét <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="flex-1 space-y-10">
              {reviewsData?.reviews?.length > 0 ? (
                reviewsData.reviews.map((review: any) => (
                  <div key={review.id} className="pb-10 border-b border-gray-50 flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-black text-primary uppercase">
                      {review.user?.username?.[0] || "U"}
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <p className="text-[10px] font-black uppercase tracking-widest">{review.user?.username}</p>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-accent text-accent' : 'text-gray-200'}`} />)}
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground italic">12/03/2026</span>
                      </div>
                      <p className="text-primary/70 font-medium italic leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                  <MessageSquare className="w-10 h-10 text-gray-200 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section>
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Sản phẩm <br /> <span className="text-accent italic font-serif">Tương tự</span></h2>
            <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-all border-b-2 border-primary/10 pb-1">Xem thêm</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts?.map((p: any, idx: number) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
