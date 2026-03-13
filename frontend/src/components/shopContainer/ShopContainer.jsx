/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { FilterSidebar } from "../common/FilterSidebar";
import { SortBar } from "../common/SortBar";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "../common/Pagination";
export default function ShopContainer({
  products = [],
  pagination = { totalPages: 1, currentPage: 1 },
  loading = false,
  error = null,
  filters,
  onFilterChange,
  CATEGORIES = [],
  PRICE_RANGES = [],
  RATINGS = [],
  SORT_OPTIONS = [],
  PRICE_SORT_OPTIONS = [],
}) {
  // State riêng cho ô input tìm kiếm
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Đồng bộ lại input khi filters.search thay đổi (back/forward browser, refresh)
  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  // Scroll lên đầu khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);

  const updateFilter = (changes) => {
    onFilterChange({
      ...changes,
      page: changes.page ?? (changes.search !== undefined ? 1 : filters.page),
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed !== filters.search) {
      updateFilter({ search: trimmed });
    }
  };

  // Các hàm toggle giữ nguyên
  const toggleCategory = (categoryName) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];
    updateFilter({ categories: newCategories });
  };

  const togglePriceRange = (range) => {
    const isSelected = filters.priceRanges.some((r) => r.min === range.min && r.max === range.max);
    const newRanges = isSelected
      ? filters.priceRanges.filter((r) => !(r.min === range.min && r.max === range.max))
      : [...filters.priceRanges, range];
    updateFilter({ priceRanges: newRanges });
  };

  const toggleRating = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    updateFilter({ ratings: newRatings });
  };

  const toggleDiscount = (checked) => {
    updateFilter({ hasDiscount: checked });
  };

  const handleSortChange = (sort) => {
    updateFilter({ sort });
  };

  const handlePageChange = (page) => {
    onFilterChange({ page });
  };

  // if (error) {
  //   return <div className="text-center py-10 text-red-500">{error}</div>;
  // }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <FilterSidebar
          selectedCategories={filters.categories}
          selectedPriceRanges={filters.priceRanges}
          selectedRatings={filters.ratings}
          hasDiscount={filters.hasDiscount}
          onToggleCategory={toggleCategory}
          onTogglePriceRange={togglePriceRange}
          onToggleRating={toggleRating}
          onToggleDiscount={toggleDiscount}
          CATEGORIES={CATEGORIES}
          PRICE_RANGES={PRICE_RANGES}
          RATINGS={RATINGS}
        />

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <SortBar
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearchSubmit={handleSearchSubmit}
            sortBy={filters.sort}
            onSortChange={handleSortChange}
            SORT_OPTIONS={SORT_OPTIONS}
            PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl h-96"></div>
               ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fadeIn">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="pt-12">
                <Pagination
                  currentPage={pagination.currentPage || 1}
                  totalPages={pagination.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 premium-card bg-white text-center">
              <div className="bg-secondary p-8 rounded-full mb-6">
                <ShoppingCart className="w-16 h-16 text-primary/20" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-muted-foreground font-medium max-w-sm">
                Rất tiếc, chúng tôi không tìm thấy kết quả phù hợp với bộ lọc hiện tại của bạn.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-8 btn-primary px-10"
              >
                Tải lại trang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}