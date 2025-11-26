import ReactDOM from "react-dom";

function Modal({open, onClose, children}) {
    if (!open) return null;

  return ReactDOM.createPortal(
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <button style={closeStyle} onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.body
  );
}

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "black",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "350px",
  maxWidth: "90vw",
  position: "relative",
};

const closeStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  cursor: "pointer",
};

export default Modal;