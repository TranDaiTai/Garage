"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-empty */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext"; 
import axiosClient from "@/api/axiosClient";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); 

  const loadCart = async () => {
    setIsLoading(true);
    if (user) {
      try {
        const res = await axiosClient.get("/cart"); 
        if(res.success && res.data) {
           // Giả sử API trả về mảng các OrderItem/CartItem ở res.data.items
           setItems(res.data.items || []);
           // Tính tổng tiền dựa trên items
           const computedTotal = (res.data.items || []).reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
           setTotalPrice(computedTotal);
        }
      } catch (err) {
        console.error("Load cart failed", err);
      }
    } else {
      setItems([]);
      setTotalPrice(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, [user]); 

  // ----- Thao tác giỏ hàng -----
  const addItem = async (product, quantity = 1) => {
    if (user) {
      try {
        await axiosClient.post("/cart/add", { productId: product.id, quantity });
        loadCart();
      } catch(e) {
        console.error("Thêm giỏ hàng thất bại", e);
      }
    } else {
       // Xử lý giỏ hàng offline nếu cần (tuỳ chọn)
       alert("Vui lòng đăng nhập để mua hàng");
    }
  };

  const removeItem = async (productId) => {
    if (user) {
      try {
        await axiosClient.delete(`/cart/remove/${productId}`);
        loadCart();
      }catch(e){
        console.error("Xoá giỏ hàng thất bại", e);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (user) {
      try {
        await axiosClient.put("/cart/update", { productId, quantity });
        loadCart();
      } catch(e) {
        console.error("Cập nhật số lượng thất bại", e);
      }
    }
  };

  const clearCart = async () => {
    if (user) {
      try{
        await axiosClient.delete("/cart/clear");
        loadCart();
      }catch(e){}
    }
  };

  const getTotalItems = () => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
