export default function Hero({ setPage }) {
  return (
    <section
      style={{
        background:
          "linear-gradient(to right, #0B3C5D, #1D70A2)",
        color: "white",
        padding: "80px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "52px",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Tamil Nadu Water Leakage Reporting Portal
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            Report water leakages instantly and help save
            valuable water resources across Tamil Nadu.
          </p>

          <button
            onClick={() => setPage("report")}
            style={{
              background: "#FFD166",
              color: "#000",
              border: "none",
              padding: "15px 30px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Report Leakage
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "50px",
              borderRadius: "20px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <h1 style={{ fontSize: "90px" }}>💧</h1>

            <h3>Save Every Drop</h3>

            <p style={{ marginTop: "15px" }}>
              Smart citizen complaint reporting system
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}