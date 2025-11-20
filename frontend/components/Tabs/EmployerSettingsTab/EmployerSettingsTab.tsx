import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployerProfileTab from "./EmployerProfileTab/EmployerProfileTab";
import EmployerPasswordTab from "./EmployerPasswordTab/EmployerPasswordTab";

export function EmployerSettingsTab() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <EmployerProfileTab />
        </TabsContent>
        <TabsContent value="password">
          <EmployerPasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
