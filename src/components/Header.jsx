export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "20px 24px",
        textAlign: "center",
        position: "sticky",
        top: 0,
        background: "#1a1f3a",
        zIndex: 1000
      }}
    >
      <div
        style={{
          fontSize: "13px",
          letterSpacing: "0.2em",
          color: "#d4af37",
          fontWeight: "600"
        }}
      >
        SALON DIAGNOSTIC
      </div>

      <div
        style={{
          width: "60px",
          height: "2px",
          background: "#d4af37",
          margin: "8px auto 0"
        }}
      />
    </header>
  );
}