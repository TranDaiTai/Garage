"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import { useState } from "react";

export function FilterSidebar({
  selectedCategories,
  selectedPriceRanges,
  selectedRatings,
  hasDiscount,
  onToggleCategory,
  onTogglePriceRange,
  onToggleRating,
  onToggleDiscount,
  CATEGORIES = [],
  PRICE_RANGES = [],
  RATINGS = [],
}) {
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true,
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const isPriceRangeSelected = (range) => {
    return selectedPriceRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );
  };

  const isRatingSelected = (ratingValue) => {
    return selectedRatings.includes(ratingValue);
  };

  // clearAllFilters functionality should ideally be handled by the parent
  // but we can provide a visual 'Clear All' button that triggers resets

  return (
    <div className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-lg font-black text-primary flex items-center gap-2 uppercase tracking-tight">
            <Filter className="w-5 h-5 text-accent" /> Bộ Lọc
          </h3>
          {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || selectedRatings.length > 0 || hasDiscount) && (
            <button 
              onClick={() => window.location.reload()} // Quick dirty reset for now
              className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-1"
            >
              Xóa tất cả <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="premium-card p-6 bg-white overflow-hidden">
          <button
            onClick={() => toggleFilter("category")}
            className="w-full flex items-center justify-between font-black text-primary text-sm uppercase tracking-wider group"
          >
            Danh mục
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-transform duration-300 ${
                expandedFilters.category ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.category && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {CATEGORIES.map((category) => (
                <label
                  key={category.id || category}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id?.toString() || category.toString())}
                      onChange={() => onToggleCategory(category.id?.toString() || category.toString())}
                      className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-100 checked:border-accent checked:bg-accent transition-all duration-300 cursor-pointer"
                    />
                    <div className="absolute opacity-0 peer-checked:opacity-100 text-white transition-opacity pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {category.name || category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="premium-card p-6 bg-white">
          <button
            onClick={() => toggleFilter("price")}
            className="w-full flex items-center justify-between font-black text-primary text-sm uppercase tracking-wider group"
          >
            Khoảng giá
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-transform duration-300 ${
                expandedFilters.price ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.price && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {PRICE_RANGES.map((range) => (
                <label
                  key={`${range.min}-${range.max}`}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                   <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isPriceRangeSelected(range)}
                      onChange={() => onTogglePriceRange(range)}
                      className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-100 checked:border-accent checked:bg-accent transition-all duration-300 cursor-pointer"
                    />
                    <div className="absolute opacity-0 peer-checked:opacity-100 text-white transition-opacity pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="premium-card p-6 bg-white">
          <button
            onClick={() => toggleFilter("rating")}
            className="w-full flex items-center justify-between font-black text-primary text-sm uppercase tracking-wider group"
          >
            Đánh giá
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-transform duration-300 ${
                expandedFilters.rating ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.rating && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {RATINGS.map((rating) => {
                const value = typeof rating === "object" ? rating.value : rating;
                const label = typeof rating === "object" ? rating.label : `${rating} sao trở lên`;

                return (
                  <label
                    key={value}
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                     <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isRatingSelected(value)}
                          onChange={() => onToggleRating(value)}
                          className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-100 checked:border-accent checked:bg-accent transition-all duration-300 cursor-pointer"
                        />
                        <div className="absolute opacity-0 peer-checked:opacity-100 text-white transition-opacity pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Discount Filter */}
        <div className="premium-card p-6 bg-white">
          <label className="flex items-center gap-3 cursor-pointer group">
             <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={hasDiscount}
                  onChange={(e) => onToggleDiscount(e.target.checked)}
                  className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-100 checked:border-accent checked:bg-accent transition-all duration-300 cursor-pointer"
                />
                <div className="absolute opacity-0 peer-checked:opacity-100 text-white transition-opacity pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            <span className="text-sm font-black text-primary uppercase tracking-wider">Có khuyến mãi</span>
          </label>
        </div>
      </div>
    </div>
  );
}