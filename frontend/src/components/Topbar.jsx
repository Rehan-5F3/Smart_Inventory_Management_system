function Topbar() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div
      style={{
        height: "80px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            fontWeight: "700",
            color: "#1E1E2F",
          }}
        >
          {greeting} 👋
        </h3>

        <small style={{ color: "#777" }}>
          Manage your jewellery inventory efficiently
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span style={{ fontSize: "24px", cursor: "pointer" }}>🔔</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#D4AF37",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            O
          </div>

          <div>
            <strong>Owner</strong>
            <br />
            <small style={{ color: "#777" }}>Administrator</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;