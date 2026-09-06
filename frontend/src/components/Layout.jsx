import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          backgroundColor: "#F5F7FB",
        }}
      >
        <Topbar />

        <div className="container-fluid p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;