import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-white p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                ECO<span className="text-accent">MARKET</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              EcoMarket cung cấp giải pháp mua sắm thông minh và bền vững, mang đến những sản phẩm chất lượng cao nhất cho gia đình bạn.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Khám Phá</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Cửa Hàng</Link></li>
              <li><Link to="/promotions" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Khuyến Mãi</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Về Chúng Tôi</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Tin Tức</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Hỗ Trợ</h4>
            <ul className="space-y-4">
              <li><Link to="/faqs" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Câu Hỏi Thường Gặp</Link></li>
              <li><Link to="/shipping" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Chính Sách Vận Chuyển</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Bảo Mật Thông Tin</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium">Điều Khoản Dịch Vụ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Liên Hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <p className="text-primary-foreground/70 text-sm">123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <p className="text-primary-foreground/70 text-sm">1900 1234 (8:00 - 21:00)</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <p className="text-primary-foreground/70 text-sm">support@ecomarket.vn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-xs font-medium">
            © {currentYear} ECO MARKET. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 contrast-0 grayscale invert" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50 contrast-0 grayscale invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}