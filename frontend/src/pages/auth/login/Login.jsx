/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Mail, Lock, LogIn, Github, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isLoading, login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = new URLSearchParams(location.search).get("redirect") || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-[150px] animate-pulse delay-1000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slideUp">
        <Link to="/" className="flex items-center justify-center gap-3 mb-12 group w-fit mx-auto transition-all">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-premium group-hover:bg-accent transition-colors">E</div>
            <span className="text-3xl font-black text-primary tracking-tighter uppercase italic">EcoMarket</span>
        </Link>
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-black text-primary tracking-tight uppercase">
            XIN CHÀO TRỞ LẠI
          </h2>
          <div className="h-1.5 w-12 bg-accent mx-auto rounded-full"></div>
          <p className="text-muted-foreground font-medium italic pt-2">
            "Mua sắm là một nghệ thuật, và bạn là một nghệ sĩ."
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slideUp delay-100">
        <div className="glass-effect p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-premium relative overflow-hidden">
          
          {error && (
            <div className="mb-8 p-5 bg-red-500/10 text-red-600 font-bold rounded-2xl border border-red-500/20 flex items-start gap-4 text-xs tracking-wide uppercase animate-shake">
                <div className="mt-0.5">⚠️</div>
                <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label htmlFor="email" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">
                Danh tính / Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none"
                  placeholder="Nhập email hoặc username"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                 <label htmlFor="password" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                   Mật mã bảo mật
                 </label>
                 <Link to="/forgot-password" title="Khôi phục mật khẩu" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">
                    Quên?
                 </Link>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   className="w-full pl-14 pr-6 py-5 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-secondary rounded-lg bg-white peer-checked:bg-accent peer-checked:border-accent transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Duy trì đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-5 font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Xác minh...
                </>
              ) : (
                <>
                  Bắt đầu trải nghiệm <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="px-5 bg-transparent text-muted-foreground/40">Kết nối nhanh</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-white border border-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-secondary transition-all active:scale-95 shadow-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-sm">
                <Github className="h-4 w-4" />
                GitHub
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                Lần đầu tới đây? {" "}
                <Link to="/register" className="text-accent hover:underline decoration-2 underline-offset-4">
                  Trở thành Eco-Member ngay
                </Link>
             </p>
          </div>
        </div>
      </div>
      
      <Link to="/" className="mt-8 mx-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-accent transition-all group animate-fadeIn">
         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Về trang chủ
      </Link>
    </div>
  );
}

