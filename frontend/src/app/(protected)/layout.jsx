function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

export default ProtectedLayout;
