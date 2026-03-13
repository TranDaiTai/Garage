import { Menu, X, Wrench, ChevronDown, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom";


export  function UserAvatar({ name, size = "normal" }) {
  const isLarge = size === "large";

  return (
    <div className={`navbar__profile-avatar ${isLarge ? "navbar__profile-avatar-large" : ""}`}>
      {name ? name.charAt(0).toUpperCase() : <User />}
    </div>
  );
}

export  function UserProfileDesktop({ user, isOpen, onToggle, onLogout }) {
  return (
    <div className="navbar__profile">
      <button
        onClick={onToggle}
        className="navbar__profile-trigger"
      >
        <UserAvatar name={user.fullName} />
        <span className="navbar__profile-name">{user.fullName}</span>
        <ChevronDown className={`navbar__profile-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="navbar__dropdown">
          <Link to="/profile" className="navbar__dropdown-item">
            <User className="navbar__dropdown-icon" />
            Tài khoản của tôi
          </Link>
          <Link to="/bookings" className="navbar__dropdown-item">
            <Wrench className="navbar__dropdown-icon" />
            Đơn hàng
          </Link>
          <div className="navbar__dropdown-divider"></div>
          <button
            onClick={onLogout}
            className="navbar__dropdown-item navbar__dropdown-logout"
          >
            <LogOut className="navbar__dropdown-icon" />
            Đăng Xuất
          </button>
        </div>
      )}
    </div>
  );
}

export  function UserProfileMobile({ user, onLogout }) {
  return (
    <>
      <div className="navbar__mobile-profile">
        <div className="navbar__mobile-profile-header">
          <UserAvatar name={user.name} size="large" />
          <div>
            <p className="navbar__mobile-profile-name">{user.name}</p>
            <p className="navbar__mobile-profile-email">{user.email || "Khách hàng"}</p>
          </div>
        </div>

        <Link to="/profile" className="navbar__mobile-profile-link">
          <User className="w-4 h-4" />
          Tài khoản
        </Link>
        <Link to="/bookings" className="navbar__mobile-profile-link">
          <Wrench className="w-4 h-4" />
            Đơn hàng
        </Link>
      </div>

      <button onClick={onLogout} className="navbar__button-logout-full">
        <LogOut className="w-4 h-4" />
        Đăng Xuất
      </button>
    </>
  );
}