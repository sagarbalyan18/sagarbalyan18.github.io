const ActionButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        border: "none",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Premium gradient
        color: "white",
        fontSize: "13px",
        fontWeight: "600",
        fontFamily: "Montserrat, sans-serif", // Clean & modern font
        cursor: "pointer",
        borderRadius: "8px",
        transition: "0.3s ease-in-out",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        letterSpacing: "1px",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
      {title}
    </button>
  );
};

export default ActionButton;
