import { useState } from "react";

const ProductImage = ({ product }) => {
  const productImages = product?.images?.map(img => img.imageUrl) || [product?.image] || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 sticky top-36">
      {/* Main image - Clean Container */}
      <div className="bg-white rounded-lg border border-gray-100 aspect-square p-2 flex items-center justify-center overflow-hidden group">
        <img
          src={productImages[selectedImageIndex] || "https://placehold.co/800x800/png?text=Product+Image"}
          alt={product?.name || "Product"}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Thumbnails */}
      {productImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                selectedImageIndex === idx
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;