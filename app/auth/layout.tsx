type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="h-screen flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
