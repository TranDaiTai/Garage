import { Star } from "lucide-react";
import ReviewCard from "@/components/common/ReviewCard";
import { useState, useEffect, useMemo } from "react";
import axiosClient from "@/api/axiosClient";
import Pagination from "./Pagination";

export default function ReviewComponent({ product }) {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState();
  const [pagination, setPagination] = useState();
  useEffect(() => {
    const fetchReviewsProduct = async () => {
      try {
        const res = await axiosClient.get(`/reviews/product/${product.id}`);
        if(res.success) {
          setReviews(res.data.reviews || []);
          setPagination(res.data.pagination);
        }
      } catch (e) {
        console.error("Error fetching reviews", e);
      }
    };
    if(product?.id) fetchReviewsProduct();
  }, [selectedFilter, product]);

  useEffect(() => {
    const fetchReviewsStats = async () => {
      try {
        const res = await axiosClient.get(`/reviews/product/${product.id}/stats`);
        if(res.success) {
          setStats(res.data.stats);
        }
      } catch (e) {
        console.error("Error fetching stats", e);
      }
    };
    if(product?.id) fetchReviewsStats();
  }, [product]);

  const handleFilterChange = (change) => {
    setSelectedFilter((prev) => {
      return { ...prev, ...change };
    });
  };

  const handleLikeReview = (reviewId) => {};
  // Filter reviews theo rating đã chọn
  const filteredReviews = useMemo(() => {
    if (!selectedFilter || !reviews) return reviews;

    return reviews.filter((review) => {
      if (selectedFilter.rating === "media") {
        return review.media?.length > 0;
      }
      if (selectedFilter.rating === "comments") {
        return review.comments?.length > 0;
      }
      return selectedFilter.rating ? Math.round(review.rating) === selectedFilter.rating : true;
    });
  }, [reviews, selectedFilter]);

  const getRatingCount = (star) => stats?.ratingCounts?.[star] ?? 0;

  const filterButtons = [
    { label: `5 Sao (${getRatingCount(5)})`, value: 5 },
    { label: `4 Sao (${getRatingCount(4)})`, value: 4 },
    { label: `3 Sao (${getRatingCount(3)})`, value: 3 },
    { label: `2 Sao (${getRatingCount(2)})`, value: 2 },
    { label: `1 Sao (${getRatingCount(1)})`, value: 1 },
    {
      label: `Có Hình Ảnh / Video (${stats?.mediaCount ?? 0})`,
      value: "media",
    },
  ];

  return (
    <div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {product.rating || 0}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating || 0)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews?.length || 0} đánh giá
            </p>
          </div>

          {/* Rating Filters */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  handleFilterChange({ rating: filter.value })
                }
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? "border-accent text-accent bg-accent/5"
                    : "border-border text-foreground hover:border-accent hover:bg-accent/5"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onLike={() => handleLikeReview()}
          />
        ))}

        {(!filteredReviews || filteredReviews.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            Không có đánh giá nào phù hợp với bộ lọc
          </div>
        )}
      </div>
      <Pagination
      currentPage={pagination?.currentPage || 1}
      totalPages={pagination?.totalPages || 1}
      onPageChange={(page) => handleFilterChange({ page })}
    />
    </div>
    
  );
}





