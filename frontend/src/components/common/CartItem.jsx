import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

export function CartItem({ items ,updateQuantity,removeItem,clearCart  }) {
  return (
    <div className="lg:col-span-2">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.product?.id}
            className="bg-card border border-border rounded-lg p-4 flex gap-4"
          >
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
              <img
                src={item.product?.mainImage || "/placeholder.svg"}
                alt={item.product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link
                  to={`/product/${item.product?.slug || item.product?.id}`}
                  className="text-foreground font-semibold hover:text-accent transition-colors"
                >
                  {item.product?.name}
                </Link>
                <p className="text-accent font-bold mt-1">
                  {item.product?.price.toLocaleString("vi-VN").slice(0, -3)}K
                </p>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product?.id, item.quantity - 1)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-12 text-center border border-border rounded py-1 bg-background text-foreground text-sm"
                />
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end justify-between">
              <p className="font-bold text-foreground">
                {item.itemTotal.toLocaleString("vi-VN").slice(0, -3)}K
              </p>
              <button
                onClick={() => removeItem(item.product.id)}
                className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={()=>clearCart()}
        className="mt-4 text-sm text-destructive hover:text-destructive/80 transition-colors font-medium hover:cursor-pointer"
      >
        Xóa tất cả
      </button>
    </div>
  );
}
