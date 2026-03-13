/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldQuestion, Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-20 px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slideUp">
        <Link to="/" className="flex items-center justify-center gap-4 mb-12 group w-fit mx-auto transition-all active:scale-95">
            <div className="w-12 h-12 bg-primary px-3 py-2 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-premium group-hover:rotate-6 transition-transform">E</div>
            <span className="text-3xl font-black text-primary tracking-tighter uppercase">EcoMarket</span>
        </Link>
        <h2 className="text-center text-4xl font-black text-primary tracking-tighter uppercase leading-tight">
          CỨU HỘ MẬT KHẨU
        </h2>
        <p className="mt-4 text-center text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] italic">
          Đoạn mã bảo mật sẽ được gửi ngay đến bạn
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-lg z-10 animate-slideUp delay-100">
        <div className="premium-card bg-white/40 backdrop-blur-xl py-12 px-8 md:px-14 border border-white shadow-premium relative overflow-hidden group">
          
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {!submitted ? (
            <div className="space-y-10">
              <div className="flex justify-center">
                 <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center text-primary shadow-inner border border-white transition-transform group-hover:scale-110">
                    <ShieldQuestion className="w-10 h-10" />
                 </div>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
                    Địa chỉ Email liên kết
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-primary/20 group-focus-within/input:text-accent transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-secondary/30 border-none rounded-3xl pl-16 pr-6 py-5 focus:ring-2 focus:ring-accent font-bold text-primary transition-all outline-none placeholder:text-primary/20"
                      placeholder="NGUYENVANA@ECO.COM"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-5 font-black uppercase tracking-widest active:scale-95 shadow-xl flex justify-center items-center gap-4 group/btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-[10px]">Đang mã hóa yêu cầu...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" /> 
                      <span className="text-[10px]">Gửi Link Khôi Phục</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center space-y-8 animate-fadeIn">
               <div className="flex justify-center">
                 <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce-slow">
                    <CheckCircle2 className="w-12 h-12" />
                 </div>
              </div>
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-primary uppercase tracking-tight">KIỂM TRA HỘP THƯ</h3>
                 <p className="text-primary/40 font-medium italic leading-relaxed max-w-xs mx-auto">
                   Chúng tôi đã gửi hướng dẫn đến <span className="text-primary font-black not-italic">{email}</span>. Vui lòng kiểm tra cả thư mục rác nếu không thấy.
                 </p>
              </div>
              
              <div className="pt-6">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline underline-offset-8 decoration-2 flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-4 h-4" /> Gửi lại yêu cầu khác
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-secondary text-center">
             <Link to="/login" className="inline-flex items-center gap-3 text-[10px] font-black text-primary/30 hover:text-primary uppercase tracking-[0.2em] transition-all group/back">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover/back:-translate-x-1" /> 
                Quay lại Đăng nhập
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
