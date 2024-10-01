import { Header } from "@/components/header";
import { UserPassword } from "@/components/user-settings/user-password";
import { UserPersonalInfo } from "@/components/user-settings/user-personal-info";
import { getUser } from "@/lib/actions/actions";

const UserSettings = async () => {
  const user = await getUser();
  return (
    <>
      <Header headerLabel="User Settings" formComponent="none" />
      <div className="space-y-5">
        <UserPersonalInfo user={user} />
        {user.password && <UserPassword user={user} />}
      </div>
    </>
  );
};

export default UserSettings;
