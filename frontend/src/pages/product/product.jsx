/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ShopContainer from "@/components/shopContainer/ShopContainer";
import { useSearchParams } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { ShoppingCart } from "lucide-react";

const PRICE_RANGES = [
  { label: "Dưới 500.000đ", min: 0, max: 500000 },
  { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
  { label: "1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
  { label: "2.000.000đ - 5.000.000đ", min: 2000000, max: 5000000 },
  { label: "Trên 5.000.000đ", min: 5000000, max: Infinity },
];
const RATINGS = [
  { value: 5, label: "5 sao" },
  { value: 4, label: "4 sao trở lên" },
  { value: 3, label: "3 sao trở lên" },
  { value: 2, label: "2 sao trở lên" },
  { value: 1, label: "1 sao trở lên" },
];
const ITEMS_PER_PAGE = 8;
const SORT_OPTIONS = [
  { value: "relevant", label: "Liên Quan" },
  { value: "newest", label: "Mới Nhất" },
  { value: "best-selling", label: "Bán Chạy" },
];
const PRICE_SORT_OPTIONS = [
  { value: "price-low", label: "Giá Tăng dần" },
  { value: "price-high", label: "Giá Giảm dần" },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoriesData, setCategoriesData] = useState([]);

  // Khởi tạo filters từ URL
  const initialFilters = {
    search: searchParams.get("search") || "",
    categories: searchParams.getAll("category"), 
    priceRanges: [], 
    ratings: searchParams.getAll("rating").map(Number), 
    hasDiscount: searchParams.get("hasDiscount") === "true",
    sort: searchParams.get("sort") || "newest",
    page: Number(searchParams.get("page")) || 1,
  };

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice) {
    const selectedRange = PRICE_RANGES.find(
      (r) => r.min === Number(minPrice) && (r.max === Infinity || r.max === Number(maxPrice))
    );
    if (selectedRange) {
      initialFilters.priceRanges = [selectedRange];
    }
  }

  const [productsData, setProductsData] = useState({
    data: [],
    pagination: { totalPages: 1, totalItems: 0, currentPage: 1 },
    loading: false,
    error: null,
  });

  const [filters, setFilters] = useState(initialFilters);

  // Fetch Categories 1 lần duy nhất khi mount
  useEffect(() => {
     axiosClient.get("/categories")
       .then(res => {
          if(res.success) {
            // Chuyển đổi định dạng cho FilterSidebar nếu cần, hoặc cứ pass thẳng mảng Object
            const mappedCats = res.data.map(c => c.id.toString());
            // Note: Cần cẩn thận ở đây vì FilterSidebar hiện tại dùng String match. Ta sẽ fetch raw
            setCategoriesData(res.data);
          }
       })
       .catch(err => console.error("Could not load categories", err));
  }, []);

  // Sync URL Params
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", filters.page);
    params.set("limit", ITEMS_PER_PAGE);

    if (filters.search) params.set("search", filters.search);
    filters.categories.forEach((cat) => params.append("category", cat));

    if (filters.priceRanges.length > 0) {
      const range = filters.priceRanges[0];
      params.set("minPrice", range.min);
      if (range.max !== Infinity) {
        params.set("maxPrice", range.max);
      }
    }

    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      params.set("rating", minRating);
    }
    if (filters.hasDiscount) params.set("hasDiscount", "true");
    params.set("sort", filters.sort);

    setSearchParams(params, { replace: true }); 
  }, [filters, setSearchParams]);

  // Fetch Products data when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setProductsData((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const paramsStr = searchParams.toString();
        // Gọi thẳng API E-commerce Backend kèm query string đã build sẵn trên URL
        const res = await axiosClient.get(`/products?${paramsStr}`);
        
        if (res.success) {
           setProductsData({
              data: res.data.product,
              pagination: res.data.pagination,
              loading: false,
              error: null,
           });
        }
      } catch (err) {
        setProductsData((prev) => ({
          ...prev,
          loading: false,
          error: "Lỗi tải dữ liệu. Vui lòng thử lại sau.",
        }));
      }
    };
    // Đợi params cập nhật xong mới fetch
    fetchProducts();
  }, [searchParams]); 

  const handleFilterChange = (changes) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...changes };
      if (changes.categories || changes.priceRanges || changes.ratings || changes.hasDiscount || changes.search !== undefined) {
        newFilters.page = 1; // Reset về trang 1 nếu đổi bộ lọc
      }
      return newFilters;
    });
  };

  // Pass raw categories data to the ShopContainer
  const categoryList = categoriesData;

  return (
    <div className="min-h-screen bg-background pb-20 pt-10">
      {/* Shop Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden bg-primary flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 contrast-125"
            alt="Shop Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent"></div>
          
          <div className="relative z-10 p-8 md:p-16 space-y-4 max-w-2xl animate-slideUp">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 backdrop-blur-md">
                <ShoppingCart className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">Khám phá ngay</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Cửa Hàng</h1>
             <p className="text-primary-foreground/70 text-lg font-medium">
               Cung cấp hàng ngàn mặt hàng chất lượng cao với mức giá ưu đãi nhất thị trường.
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopContainer
          products={productsData.data}
          pagination={productsData.pagination}
          loading={productsData.loading}
          error={productsData.error}
          filters={filters}
          onFilterChange={handleFilterChange}
          CATEGORIES={categoryList} 
          PRICE_RANGES={PRICE_RANGES}
          RATINGS={RATINGS}
          SORT_OPTIONS={SORT_OPTIONS}
          PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
        />
      </div>
    </div>
  );
}

