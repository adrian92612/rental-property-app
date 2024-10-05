import { SideBar } from "@/components/dashboard/sidebar";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata = dashboardMetadata;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid sm:grid-cols-[200px_1fr]">
      <SideBar />
      <main className="relative px-4 pb-5 overflow-y-auto h-[calc(100dvh-64px)] sm:h-[100dvh]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
