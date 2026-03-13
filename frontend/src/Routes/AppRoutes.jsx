// src/Routes/AppRoutes.jsx

import { createBrowserRouter } from "react-router-dom";
import DefaultLayout, { DefaultLayoutWithoutFooter } from "@/components/layout/DefaultLayout";
import Home from "@/pages/Home";
import ShopPage from "@/pages/product/product"; // Sẽ đổi tên sau
import ProductDetailPage from "@/pages/product/[slug]";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout"; 
import NotFound from "@/pages/Notfound";
import LoginPage from "@/pages/auth/login/Login";
import { protectedLoader } from "./ProtectedRouter";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import ProfilePage from "@/pages/auth/profile/profile";


import PromotionsPage from "@/pages/promotions";
import AboutPage from "@/pages/about";


export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    path: "/",
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "promotions", element: <PromotionsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "profile", element: <ProfilePage /> },

      // Protected routes (Yêu cầu đăng nhập)
      {
        loader: protectedLoader,
        children: [
           { path: "checkout", element: <CheckoutPage /> },
        ],
      },
      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);
