import { Header } from "@/components/header";
import { BillingPayment } from "@/components/user-settings/billing-payment";
import { NotificationPreferences } from "@/components/user-settings/notifications";
import { UserPassword } from "@/components/user-settings/user-password";
import { UserPersonalInfo } from "@/components/user-settings/user-personal-info";
import { getUser } from "@/lib/actions/actions";
import { settingsMetadata } from "@/lib/metadata";

export const metadata = settingsMetadata;

const UserSettings = async () => {
  const user = await getUser();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <Header headerLabel="User Settings" formComponent="none" />
      <div className="grid gap-5 lg:grid-cols-2">
        <UserPersonalInfo user={user} />
        {user.password && <UserPassword user={user} />}
        <NotificationPreferences user={user} />
        <BillingPayment user={user} />
      </div>
    </>
  );
};

export default UserSettings;
