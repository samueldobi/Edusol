export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen bg-[url('/login-bg-image.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-lime-800 opacity-70"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}
