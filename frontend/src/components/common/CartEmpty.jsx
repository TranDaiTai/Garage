import { Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart, ArrowLeft } from "lucide-react";

export function CartEmpty({
  url_continue_shopping = "/shop",
}) {
  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center p-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-secondary rounded-full scale-110 animate-pulse"></div>
        <div className="relative bg-white p-10 rounded-full shadow-premium border border-gray-50">
           <ShoppingCart className="w-16 h-16 text-primary/40" />
        </div>
        <div className="absolute -top-2 -right-2 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-black animate-slideUp">
           ?
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-primary mb-4 tracking-tight uppercase">
        Giỏ hàng rỗng
      </h2>
      <p className="text-muted-foreground mb-10 max-w-sm text-center font-medium italic">
        "Có vẻ như túi đồ của bạn đang cần một vài món quà mới để làm đầy."
      </p>
      
      <Link
        to={url_continue_shopping}
        className="btn-primary px-10 py-4 flex items-center gap-3 font-black uppercase tracking-widest active:scale-95 shadow-xl transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Khám phá ngay
      </Link>
    </div>
  );
}

