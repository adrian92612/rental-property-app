import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User } from "@prisma/client";
import { UserAvatar } from "./user-avatar";
import { PersonalDetails } from "./personal-details";

export type UserPersonalInfoProps = {
  user: User;
};

export const UserPersonalInfo = ({ user }: UserPersonalInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 mb-5">
        <div>
          <h2 className="text-lg font-bold mb-2">Avatar</h2>
          <UserAvatar user={user} />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Personal Details</h2>
          <PersonalDetails user={user} />
        </div>
      </CardContent>
    </Card>
  );
};
