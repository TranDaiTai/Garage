export const Card = ({ children, className = "" }) => (
  <div className={`bg-card text-card-foreground rounded-xl shadow-sm border border-border ${className}`}>
    {children}
  </div>
)

export const Badge = ({ status }) => {
  let colorClass = "bg-muted text-muted-foreground"

  switch (status) {
    case "Completed":
    case "Done":
    case "Success":
      colorClass = "bg-green-50 text-green-700 border border-green-100"
      break
    case "Pending":
    case "Todo":
      colorClass = "bg-secondary text-muted-foreground border border-border"
      break
    case "In Progress":
    case "Processing":
      colorClass = "bg-accent/10 text-primary border border-accent/20"
      break
    case "Cancelled":
    case "Failed":
    case "High":
      colorClass = "bg-destructive/10 text-destructive border border-destructive/20"
      break
    case "Medium":
      colorClass = "bg-primary/5 text-primary border border-primary/10"
      break
  }

  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>{status}</span>
}

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-accent text-primary-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    outline: "border border-border bg-transparent hover:bg-muted",
    ghost: "hover:bg-muted",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
