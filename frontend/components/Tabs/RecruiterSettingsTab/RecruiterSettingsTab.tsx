import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecruiterProfileTab from "./RecruiterProfileTab/RecruiterProfileTab";
import RecruiterPasswordTab from "./RecruiterPasswordTab/RecruiterPasswordTab";

export function RecruiterSettingsTab() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <RecruiterProfileTab />
        </TabsContent>
        <TabsContent value="password">
          <RecruiterPasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
