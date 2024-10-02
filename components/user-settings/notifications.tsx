"use client";

import { User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useActionState, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { updateNotifications } from "@/lib/actions/actions";
import { useToast } from "@/hooks/use-toast";

export const NotificationPreferences = ({ user }: { user: User }) => {
  const [state, action, isPending] = useActionState(updateNotifications, {
    success: false,
    message: "",
  });
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    notifyEmail: user.notifyEmail,
    notifySms: user.notifySms,
    notifyPush: user.notifyPush,
  });

  const [switches2, setSwitches2] = useState<Record<string, boolean>>({
    notifyUpdates: user.notifyUpdates,
    notifyReminders: user.notifyReminders,
    notifyOffers: user.notifyOffers,
    notifyAlerts: user.notifyAlerts,
    notifyEvents: user.notifyEvents,
    notifyReports: user.notifyReports,
  });

  const [showButton, setShowButton] = useState<boolean>(false);

  const handleSwitchChange = (key: string, checked: boolean, batch: 1 | 2) => {
    if (batch === 1) setSwitches({ ...switches, [key]: checked });
    if (batch === 2) setSwitches2({ ...switches2, [key]: checked });
    setShowButton(true);
  };

  const handleCancel = () => {
    setSwitches({
      notifyEmail: user.notifyEmail,
      notifySms: user.notifySms,
      notifyPush: user.notifyPush,
    });
    setSwitches2({
      notifyUpdates: user.notifyUpdates,
      notifyReminders: user.notifyReminders,
      notifyOffers: user.notifyOffers,
      notifyAlerts: user.notifyAlerts,
      notifyEvents: user.notifyEvents,
      notifyReports: user.notifyReports,
    });
    setShowButton(false);
  };

  const { toast } = useToast();
  const handleToast = useCallback(() => {
    if (state.success) setShowButton(false);

    if (state.message) {
      toast({
        title: state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    handleToast();
  }, [handleToast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between h-8">
          <CardTitle>Notification Preferences</CardTitle>
          {showButton && (
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                form="notificationForm"
                type="submit"
                size="sm"
                disabled={isPending}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <form id="notificationForm" action={action}>
          <input type="hidden" id="userId" name="userId" value={user.id} />
          <div className="space-y-2 mb-5">
            <h2 className="font-bold">Where you receive these notifications</h2>
            {Object.keys(switches).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key}>{key.slice(6)}</Label>
                <Switch
                  id={key}
                  name={key}
                  checked={switches[key]}
                  disabled={isPending}
                  onCheckedChange={(checked) =>
                    handleSwitchChange(key, checked, 1)
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="font-bold">What notifications you receive</h2>
            {Object.keys(switches2).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key}>{key.slice(6)}</Label>
                <Switch
                  id={key}
                  name={key}
                  checked={switches2[key]}
                  disabled={isPending}
                  onCheckedChange={(checked) =>
                    handleSwitchChange(key, checked, 2)
                  }
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
