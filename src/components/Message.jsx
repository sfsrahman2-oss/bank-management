export default function Message({ message }) {
  if (!message) return null;
  return (
    <p className={`message ${message.ok ? "success" : "error"}`} role="status">
      {message.text}
    </p>
  );
}
