export default function Navbar({ setPage }) {
  return (
    <nav
      style={{
        background: "#0B3C5D",
        color: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        💧 TN Water Leakage Portal
      </h2>

      <div style={{ display: "flex", gap: "20px" }}>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("home")}
        >
          Home
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("report")}
        >
          Report
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setPage("track")}
        >
          Track
        </p>

        {/* Hidden Admin Access */}
        <p
          style={{
            opacity: 0,
            width: "10px",
            cursor: "default",
          }}
          onDoubleClick={() => {

            const password = prompt(
              "Admin Password"
            );

            if (password === "admin123") {

              setPage("admin");

            } else {

              alert("Access Denied");

            }

          }}
        >
          .
        </p>

      </div>
    </nav>
  );
}