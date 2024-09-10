type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-800">
      {children}
    </main>
  );
};

export default AuthLayout;
