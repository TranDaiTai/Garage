// src/pages/product/[id]/index.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, PackageX, ShieldCheck, Truck, RotateCcw, Box, ArrowRight, Star } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import ProductImage from "@/components/common/ProductImage";
import ProductInfo from "@/components/common/ProductInfo";
import ReviewComponent from "@/components/common/review";
import axiosClient from "@/api/axiosClient";

export default function ProductDetailPage() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
         const res = await axiosClient.get(`/products/slug/${slug}`);
         if (res.success && res.data) {
           setProduct(res.data.product);
           
           if (res.data.product.categoryId) {
             const relatedRes = await axiosClient.get(`/products?category=${res.data.product.categoryId}&limit=5`);
             if (relatedRes.success && relatedRes.data) {
               const filteredRelated = (relatedRes.data.product || []).filter(p => p.slug !== slug);
               setRelatedProducts(filteredRelated);
             }
           }
         }
      } catch (error) {
         console.error("Lỗi lấy chi tiết sản phẩm:", error);
      } finally {
         setIsLoading(false);
      }
    };
    
    if (slug) {
       fetchProductDetails();
       window.scrollTo(0, 0);
    }
  }, [slug]);

  if (isLoading) {
     return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
             <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải thông tin sản phẩm...</p>
          </div>
       </div>
     );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6 border border-gray-100">
           <PackageX className="w-20 h-20 text-gray-300" />
        </div>
        <h1 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">
          KHÔNG TÌM THẤY SẢN PHẨM
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm text-center">
           Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-primary text-white px-8 py-3.5 rounded-full flex items-center gap-2 font-bold uppercase tracking-wide hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <ChevronLeft className="w-5 h-5" />
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      {/* Breadcrumbs - Shopee/Tiki Style */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary flex items-center gap-1">
             <Home className="w-4 h-4" /> Trang Chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/shop" className="text-gray-500 hover:text-primary">
             Cửa hàng
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">
             {product.category?.name || "Sản phẩm"}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-md">
             {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Section: Image & Buy Info box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
             {/* Left: Gallery (40%) */}
             <div className="w-full md:w-[45%] md:border-r border-gray-100 p-6">
                <ProductImage product={product} />
             </div>
             
             {/* Right: Info & CTA (60%) */}
             <div className="w-full md:w-[55%] p-6 md:p-8">
                <ProductInfo product={product} />
             </div>
          </div>
        </div>

        {/* Store Info Banner (Mock) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden p-1">
                 <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                    <Box className="w-6 h-6 text-primary" />
                 </div>
              </div>
              <div>
                 <h3 className="font-bold text-gray-900 border-b border-dashed border-gray-300 inline-block pb-0.5">EcoMarket Official</h3>
                 <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9/5 Khách hàng hài lòng</span>
                    <span>|</span>
                    <span>100k+ Lượt theo dõi</span>
                 </div>
              </div>
           </div>
           <button className="px-6 py-2 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition-colors">
              Xem Shop
           </button>
        </div>

        {/* Content Tabs (Specs & Desc) */}
        <div className="grid md:grid-cols-12 gap-6">
           
           {/* Left Content Column */}
           <div className="md:col-span-8 space-y-6">
              {/* Product Specifications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">Chi tiết sản phẩm</h2>
                 
                 <div className="space-y-4 text-sm">
                    <div className="flex border-b border-gray-100 pb-4">
                       <div className="w-[150px] text-gray-500 shrink-0">Danh Mục</div>
                       <div className="text-gray-900 font-medium">
                          <Link to={`/shop?category=${product.category?.name}`} className="text-blue-600 hover:underline">
                            {product.category?.name || "Premium Collection"}
                          </Link>
                       </div>
                    </div>
                    {product.stock !== undefined && (
                        <div className="flex border-b border-gray-100 pb-4">
                           <div className="w-[150px] text-gray-500 shrink-0">Kho hàng</div>
                           <div className="text-gray-900 font-medium">{product.stock}</div>
                        </div>
                    )}
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                           <div className="w-[150px] text-gray-500 shrink-0 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                           <div className="text-gray-900 font-medium">{String(value)}</div>
                        </div>
                      ))
                    ) : (
                       <div className="text-gray-400 italic">Nhà cung cấp chưa cập nhật thông số nổi bật.</div>
                    )}
                 </div>
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">Mô tả sản phẩm</h2>
                 <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                   {product.description || product.fullDescription ? (
                      <div dangerouslySetInnerHTML={{ __html: product.description || product.fullDescription }} />
                   ) : (
                      <div className="text-center py-8 text-gray-400">
                         Đang cập nhật nội dung...
                      </div>
                   )}
                 </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                 <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">Đánh giá sản phẩm</h2>
                 <ReviewComponent product={product} />
              </div>

           </div>

           {/* Right Sidebar Column */}
           <div className="md:col-span-4 space-y-6">
              {/* Trust/Policy Box */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-36">
                 <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm">Mặt Hàng Chính Hãng</h3>
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                       <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-medium text-gray-900">Bảo hành 12 tháng</p>
                          <p className="text-xs text-gray-500 mt-1">Bởi nhà cung cấp điện tử được ủy quyền.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <RotateCcw className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-medium text-gray-900">15 ngày hoàn trả</p>
                          <p className="text-xs text-gray-500 mt-1">Đổi trả ngay nếu sản phẩm có lỗi từ nhà sản xuất.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-medium text-gray-900">Miễn phí vận chuyển</p>
                          <p className="text-xs text-gray-500 mt-1">Cho mọi đơn hàng nội thành có tổng trị giá trên 500.000đ.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-gray-900 uppercase">Gợi ý thêm cho bạn</h2>
               <Link to="/shop" className="text-primary font-medium text-sm flex items-center hover:underline">
                 Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
               </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.slice(0, 5).map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
