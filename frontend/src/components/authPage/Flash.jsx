export function Flash({ message, type }) {
  if (!message) return null;
  const styles =
    type === "success"
      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
      : "bg-red-50 border border-red-200 text-red-600";
  return (
    <div className={`text-xs px-3 py-2 rounded-lg ${styles} flex items-center gap-2`}>
      <span>{type === "success" ? "✓" : "!"}</span>
      {message}
    </div>
  );
}