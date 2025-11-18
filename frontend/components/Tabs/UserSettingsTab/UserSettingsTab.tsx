import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileTab from "@/components/Tabs/UserSettingsTab/UserProfileTab/UserProfileTab";
import UserPasswordTab from "@/components/Tabs/UserSettingsTab/UserPasswordTab/UserPasswordTab";
import UserResumeTab from "@/components/Tabs/UserSettingsTab/UserResumeTab/UserResumeTab";
import UserIntroVideoTab from "@/components/Tabs/UserSettingsTab/UserIntroVideoTab/UserIntroVideoTab";

export function UserSettingsTab() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfileTab />
        </TabsContent>
        <TabsContent value="resume">
          <UserResumeTab />
        </TabsContent>
        <TabsContent value="video">
          <UserIntroVideoTab />
        </TabsContent>
        <TabsContent value="password">
          <UserPasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
