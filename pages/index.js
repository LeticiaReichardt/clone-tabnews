function Home() {
  var codigo = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "radial-gradient(circle at center, #111e38 0%, #0b1528 50%, #030712 100%)",
        fontFamily: "'Cinzel Decorative', serif",
        perspective: "1000px",
      }}
    >
      <title>Leticia</title>

      <div class="center-container" id="interactive-text">
        <h1
          style={{
            "font-size": "6rem",
            "font-weight": 400,
            color: "#e0f2fe",
            "letter-spacing": "0.12em",
            position: "relative",
            "margin-bottom": "0.5rem",
            background:
              "linear-gradient(135deg, #e0f2fe 30%, #38bdf8 70%, #818cf8 100%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            "text-shadow": "0 0 30px rgba(56, 189, 248, 0.2)",
            filter: "drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))",
            animation: "textGlow 6s ease-in-out infinite alternate",
            transition: "all 0.6s ease",
          }}
        >
          Leticia
        </h1>
        <div class="divider"></div>
      </div>
    </div>
  );
  return codigo;
}

export default Home;
