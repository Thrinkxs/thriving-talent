import InfoCards from "@/components/Cards/InfoCards";
import JobCard from "@/components/Cards/JobCard";
import { FAKE_JOBS } from "@/modules/user_dashboard/utils/data";
import { IconBriefcaseFilled } from "@tabler/icons-react";

export default function UserDashboardPage() {
  return (
    <section>
      <div className="hidden lg:flex flex-wrap md:flex-nowrap justify-center gap-6">
        {/* Jobs Posted */}
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <InfoCards
          backgroundColor="bg-blue-200"
          icon={<IconBriefcaseFilled size={20} color="#3E66DF" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <InfoCards
          backgroundColor="bg-lime-100"
          icon={<IconBriefcaseFilled size={20} color="#DADF3E" stroke={2} />}
          title="Jobs posted"
          value={98}
          percentageChange={78}
        />
        <div className="hidden 2xl:block">
          <InfoCards
            backgroundColor="bg-green-200"
            icon={<IconBriefcaseFilled size={20} color="#34DE3D" stroke={2} />}
            title="Jobs posted"
            value={98}
            percentageChange={78}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl sm:text-2xl">Latest Job Posts</h3>
        <div className="mt-10 flex flex-wrap lg:flex-nowrap gap-6 justify-center">
          {FAKE_JOBS.slice(0, 3).map((job) => (
            <JobCard
              key={job.id}
              logo={job.logo}
              title={job.title}
              description={job.description}
              type={job.type}
              applied={job.applied}
              daysLeft={job.daysLeft}
              company={job.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
