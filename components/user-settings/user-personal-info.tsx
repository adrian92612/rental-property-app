import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User } from "@prisma/client";
import { UserAvatar } from "./user-avatar";

export type UserPersonalInfoProps = {
  user: User;
};

export const UserPersonalInfo = ({ user }: UserPersonalInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <UserAvatar user={user} />
      </CardContent>
    </Card>
  );
};
