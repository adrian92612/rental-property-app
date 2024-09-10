import { SideBar } from "@/components/dashboard/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid sm:grid-cols-[200px_1fr]">
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
