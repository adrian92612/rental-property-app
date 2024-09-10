import { logout } from "@/lib/actions/actions";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav>
        nav links
        <form action={logout}>
          <button>Logout</button>
        </form>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
