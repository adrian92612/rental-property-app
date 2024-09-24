import { SideBar } from "@/components/dashboard/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid sm:grid-cols-[200px_1fr]">
      <SideBar />
      <main className="relative px-4 pb-5 overflow-y-auto h-[100dvh]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
