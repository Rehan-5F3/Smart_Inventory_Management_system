import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          💎 Rehan Jewellers
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/products">
            Products
          </Link>

          <Link className="nav-link" to="/sales">
            Sales
          </Link>
          
          <Link className="nav-link" to="/sales-history">
            Sales History
          </Link>

          <button
            className="btn btn-danger ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;