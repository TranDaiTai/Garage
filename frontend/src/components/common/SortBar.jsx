"use client";
import { ChevronDown, Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export function SortBar({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  sortBy,
  onSortChange,
  SORT_OPTIONS,
  PRICE_SORT_OPTIONS,
}) {
  const [visiblePriceSort, setVisiblePriceSort] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 animate-fadeIn">
      {/* Search Input with Premium Styling */}
      <form onSubmit={onSearchSubmit} className="flex-1">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm yêu thích..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            className="w-full bg-white border-2 border-gray-50 py-4 pl-12 pr-12 rounded-2xl shadow-sm focus:bg-white focus:border-accent focus:ring-0 outline-none transition-all font-medium text-primary placeholder-muted-foreground/60"
          />
          {searchInput && (
             <button 
                type="button" 
                onClick={() => onSearchInputChange("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-muted-foreground hover:text-primary transition-colors"
             >
                <span className="text-xs font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-lg">Clear</span>
             </button>
          )}
        </div>
      </form>

      {/* Sort Options */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3 h-3" /> Sắp xếp:
        </label>
        
        <div className="flex items-center gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`px-5 py-2.5 rounded-xl transition-all whitespace-nowrap text-xs font-black uppercase tracking-wider ${
                sortBy === option.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-white text-muted-foreground hover:bg-gray-50 border border-gray-100 hover:text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}

          {/* Price Sort Dropdown Alternative */}
          <div className="relative">
            <button
              className={`px-5 py-2.5 rounded-xl border transition-all text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap ${
                PRICE_SORT_OPTIONS.some(opt => opt.value === sortBy)
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-white text-muted-foreground border-gray-100 hover:bg-gray-50 hover:text-primary"
              }`}
              onClick={() => setVisiblePriceSort(!visiblePriceSort)}
            >
              Theo Giá
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${visiblePriceSort ? "rotate-180" : ""}`} />
            </button>

            {visiblePriceSort && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-premium border border-gray-100 z-50 overflow-hidden animate-slideUp">
                {PRICE_SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setVisiblePriceSort(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-secondary ${
                      sortBy === option.value ? "text-accent bg-secondary/50" : "text-primary hover:text-accent"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}