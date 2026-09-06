import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Sales", path: "/sales", icon: "💰" },
    { name: "Sales History", path: "/sales-history", icon: "📜" },
    { name: "Reports", path: "/reports", icon: "📊" },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#1E1E2F",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "25px 15px",
      }}
    >
      <div>
        <h3
          style={{
            color: "#D4AF37",
            textAlign: "center",
            marginBottom: "40px",
            fontWeight: "bold",
          }}
        >
          💎 Smart Inventory
        </h3>

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "block",
              padding: "12px 18px",
              marginBottom: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              color: location.pathname === item.path ? "#1E1E2F" : "white",
              background:
                location.pathname === item.path ? "#D4AF37" : "transparent",
              transition: "0.3s",
              fontWeight: "500",
            }}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>

      <button
        className="btn btn-outline-warning w-100"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;