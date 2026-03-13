"use client"
import { Bell, Search, Menu, User } from "lucide-react"
const UserRole = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
}

const Header = ({ user, toggleSidebar, onSwitchRole }) => {
  return (
    <header className="h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between p-4 lg:px-8 sticky top-0 z-20 shadow-sm   ">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground md:hidden transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-muted rounded-lg px-4 py-2.5 border border-transparent focus-within:border-primary/20 transition-colors">
          <Search size={18} className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng, dịch vụ..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 mr-4 bg-muted p-1.5 rounded-lg border border-border">
          <span className="text-xs font-medium text-muted-foreground px-2">View as:</span>
          {Object.keys(UserRole).map((roleKey) => (
            <button
              key={roleKey}
              onClick={() => onSwitchRole(UserRole[roleKey])}
              className={`
                text-xs font-medium px-3 py-1.5 rounded-md transition-all
                ${
                  user.role === UserRole[roleKey]
                    ? "bg-accent text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background"
                }
              `}
            >
              {roleKey}
            </button>
          ))}
        </div>


      </div>
    </header>
  )
}

export default Header
