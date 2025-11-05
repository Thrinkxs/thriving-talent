import InfoCards from "@/components/Cards/InfoCards";
import { IconBriefcaseFilled } from "@tabler/icons-react";

export default function UserDashboardPage() {
  return (
    <section>
      <div className="flex flex-wrap gap-6">
        {/* Jobs Posted */}
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <div className="hidden 2xl:block">
          <InfoCards
            backgroundColor="bg-rose-200"
            icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
            title="Jobs posted"
            value={98}
            percentageChange={78}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3>Latest Job Posts</h3>
      </div>
    </section>
  );
}
