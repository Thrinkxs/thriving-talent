import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InternProfileTab from "@/components/Tabs/InternSettingsTab/InternProfileTab/InternProfileTab";
import InternPasswordTab from "@/components/Tabs/InternSettingsTab/InternPasswordTab/InternPasswordTab";
import InternResumeTab from "@/components/Tabs/InternSettingsTab/InternResumeTab/internResumeTab";
import InternIntroVideoTab from "@/components/Tabs/InternSettingsTab/InternIntroVideoTab/InternIntroVideoTab";

export function InternSettingsTab() {
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
          <InternProfileTab />
        </TabsContent>
        <TabsContent value="resume">
          <InternResumeTab />
        </TabsContent>
        <TabsContent value="video">
          <InternIntroVideoTab />
        </TabsContent>
        <TabsContent value="password">
          <InternPasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
