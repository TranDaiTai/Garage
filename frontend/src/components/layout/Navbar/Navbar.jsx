"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, LogOut, User, ShoppingCart, Search, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/shop", label: "Cửa Hàng" },
    { href: "/promotions", label: "Khuyến Mãi" },
    { href: "/about", label: "Giới Thiệu" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  if (isLoading) return <div className="h-16 bg-white animate-pulse" />;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-2" : "bg-white border-b border-gray-100 py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-primary/20">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-primary leading-none">
                ECO<span className="text-accent">MARKET</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-transparent focus:border-primary/20 focus:bg-white px-5 py-2.5 rounded-2xl text-sm transition-all outline-none pr-10"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-6 border-r border-gray-100 pr-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.href} 
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                <Heart className="w-6 h-6" />
              </Link>
              
              <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full border-2 border-white min-w-[20px]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {!user ? (
                <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  Đăng Nhập
                </Link>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none group"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-transparent group-hover:border-primary/30 transition-all overflow-hidden">
                      {user.avatarUrl ? (
                         <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-primary">{user.fullName?.charAt(0) || user.username?.charAt(0)}</span>
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-bold text-foreground truncate">{user.fullName || user.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="px-4 py-2.5 text-sm text-foreground hover:bg-secondary flex items-center gap-3 transition-colors">
                         <User className="w-4 h-4 text-muted-foreground" /> Hồ sơ cá nhân
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <LogOut className="w-4 h-4" /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
               onClick={() => setIsOpen(!isOpen)}
               className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-gray-200 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
               <span className="font-extrabold text-xl text-primary">MENU</span>
               <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
              <form onSubmit={handleSearch} className="mb-6 relative">
                 <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary border-none px-4 py-3 rounded-xl text-sm"
                 />
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-4 rounded-xl text-lg font-bold text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {!user ? (
                <Link 
                  to="/login" 
                  className="block w-full text-center bg-primary text-primary-foreground py-4 rounded-xl font-bold shadow-lg shadow-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng Nhập
                </Link>
              ) : (
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-extrabold text-primary border border-primary/10">
                         {user.fullName?.charAt(0) || user.username?.charAt(0)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="font-bold truncate">{user.fullName || user.username}</p>
                         <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                   </div>
                   <button onClick={handleLogout} className="w-full py-4 text-center text-red-600 font-bold bg-red-50 rounded-xl">
                      Đăng xuất
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

