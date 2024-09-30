import { Header } from "@/components/header";
import { UserPersonalInfo } from "@/components/user-settings/user-personal-info";
import { getUser } from "@/lib/actions/actions";

const UserSettings = async () => {
  const user = await getUser();
  return (
    <>
      <Header headerLabel="User Settings" formComponent="none" />
      <UserPersonalInfo user={user} />
    </>
  );
};

export default UserSettings;
