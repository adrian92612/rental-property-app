const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav>nav links</nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
