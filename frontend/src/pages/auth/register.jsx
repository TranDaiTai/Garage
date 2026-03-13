import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { User, Mail, Lock, UserPlus, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp!");
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        setError("Mật khẩu phải từ 8 ký tự trở lên");
        setIsLoading(false);
        return;
      }

      const response = await axiosClient.post("/users", {
        username,
        email,
        password,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      setError(msg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-effect rounded-[3rem] shadow-premium p-12 text-center border border-white/40 flex flex-col items-center animate-slideUp">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black text-primary mb-4 tracking-tight uppercase leading-tight">CHÀO MỪNG TÂN THÀNH VIÊN!</h1>
          <p className="text-muted-foreground mb-12 font-medium italic group-hover:scale-105 transition-transform">
            "Hành trình mua sắm tuyệt vời của bạn tại EcoMarket chính thức bắt đầu từ đây."
          </p>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mb-4 shadow-inner">
             <div className="bg-accent h-full animate-[progress_3s_linear]"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Đang chuẩn bị không gian riêng cho bạn (3s)...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-[150px] animate-pulse delay-700"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slideUp">
        <Link to="/" className="flex items-center justify-center gap-3 mb-10 group w-fit mx-auto transition-all">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-premium group-hover:bg-accent transition-colors">E</div>
            <span className="text-3xl font-black text-primary tracking-tighter uppercase italic">EcoMarket</span>
        </Link>
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-black text-primary tracking-tight uppercase leading-tight">
            GIA NHẬP ECO-HUB
          </h2>
          <div className="h-1.5 w-12 bg-accent mx-auto rounded-full"></div>
          <p className="text-muted-foreground font-medium italic pt-2">
            Vì bạn xứng đáng với những trải nghiệm tốt nhất.
          </p>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slideUp delay-100">
        <div className="glass-effect p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-premium relative">
          
          {error && (
            <div className="mb-8 p-5 bg-red-500/10 text-red-600 font-bold rounded-2xl border border-red-500/20 flex items-start gap-4 text-xs tracking-wide uppercase animate-shake">
                <div className="mt-0.5 text-lg">⚠️</div>
                <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-2">
              <label htmlFor="username" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">
                Danh xưng hội viên
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none"
                  placeholder="VD: eco_warrior_01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">
                Hộp thư điện tử
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label htmlFor="password" sex className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">
                   Mật mã
                 </label>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                     <Lock className="h-4 w-4" />
                   </div>
                   <input
                     id="password"
                     name="password"
                     type="password"
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none text-sm"
                     placeholder="••••••••"
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label htmlFor="confirmPassword" sex className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">
                   Xác thực
                 </label>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                     <CheckCircle2 className="h-4 w-4" />
                   </div>
                   <input
                     id="confirmPassword"
                     name="confirmPassword"
                     type="password"
                     required
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-secondary/30 border-none rounded-2xl font-bold text-primary placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-accent transition-all outline-none text-sm"
                     placeholder="••••••••"
                   />
                 </div>
               </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-5 font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang thiết lập...
                  </>
                ) : (
                  <>
                    Xác nhận gia nhập <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                Bạn đã là một phần của Eco-Hub? {" "}
                <Link to="/login" className="text-accent hover:underline decoration-2 underline-offset-4">
                  Đăng nhập tại đây
                </Link>
             </p>
          </div>
        </div>
      </div>
      
      <Link to="/" className="mt-10 mx-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-accent transition-all group animate-fadeIn">
         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Về trang chủ
      </Link>
    </div>
  );
}


