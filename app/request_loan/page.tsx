import { Separator } from "@/registry/new-york/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-b-6">
      <Separator />
      <ProfileForm />
    </div>
  );
}
