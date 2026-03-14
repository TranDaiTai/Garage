"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { cartService } from "@/services/cartService";
import { getImageUrl } from "@/lib/utils";

interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  cartItemId?: number; // Backend cart item ID mapping
  variantId?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const [initialized, setInitialized] = useState(false);

  // Sync with backend if user is logged in, else LocalStorage
  useEffect(() => {
    if (authLoading) return;

    const initCart = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const res = await cartService.getCart();
          const cartData = res.data || res;
          if (cartData && cartData.items) {
             const mappedItems = cartData.items.map((item: any) => ({
                id: item.product?.id || item.productId || item.id,
                slug: item.product?.slug || "",
                name: item.product?.name || `Product ${item.product?.id || item.productId}`,
                price: item.price || item.product?.price || 0,
                image: getImageUrl(item.product?.images?.[0]?.imageUrl || item.product?.image || ""),
                quantity: item.quantity,
                cartItemId: item.id,
                variantId: item.variantId
             }));
             setItems(mappedItems);
          } else {
             setItems([]);
          }
        } catch (err) {
          console.error("Error fetching cart from backend", err);
        }
      } else {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        } else {
          setItems([]);
        }
      }
      setIsLoading(false);
      setInitialized(true);
    };

    initCart();
  }, [user, authLoading]);

  // Sync to local storage only if NOT logged in, after initialized
  useEffect(() => {
    if (initialized && !user) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, user, initialized]);

  const addToCart = async (product: any, quantity: number = 1) => {
    const existing = items.find((item) => 
      item.id === product.id && item.variantId === product.variantId
    );

    if (user) {
       try {
         await cartService.addToCart(product.id, product.variantId, quantity);
         if (existing) {
           toast.success(`Đã tăng số lượng ${product.name}`);
           setItems((prev) => prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
         } else {
           toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
           setItems((prev) => [...prev, { ...product, quantity }]);
         }
       } catch (err) {
         toast.error("Lỗi khi thêm vào giỏ hàng!");
       }
    } else {
        if (existing) {
          toast.success(`Đã tăng số lượng ${product.name}`);
          setItems((prev) =>
            prev.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            )
          );
        } else {
          toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
          setItems((prev) => [...prev, { ...product, quantity }]);
        }
    }
  };

  const removeFromCart = async (id: number) => {
    const itemToRemove = items.find(i => i.id === id);
    if (!itemToRemove) return;

    if (user) {
       try {
         await cartService.removeFromCart(itemToRemove.cartItemId, id, itemToRemove.variantId);
         setItems((prev) => prev.filter((item) => item.id !== id));
         toast.error("Đã xóa sản phẩm khỏi giỏ hàng");
       } catch (err) {
         toast.error("Lỗi khi xóa khỏi giỏ hàng");
       }
    } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.error("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const updateQuantity = async (id: number, quantity: number, variantId?: number) => {
    if (quantity < 1) return;
    const itemToUpdate = items.find(i => i.id === id && i.variantId === variantId);
    if (!itemToUpdate) return;

    if (user) {
       try {
          await cartService.updateCartItem(itemToUpdate.cartItemId, id, itemToUpdate.variantId, quantity);
          setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
       } catch (err) {
          toast.error("Lỗi cập nhật số lượng");
       }
    } else {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    }
  };

  const clearCart = async () => {
    if (user) {
       try {
         await cartService.clearCart();
         setItems([]);
       } catch (err) {}
    } else {
       setItems([]);
    }
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
