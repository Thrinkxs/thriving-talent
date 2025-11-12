"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Briefcase,
  Users,
  Calendar,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";

// Mock data for now
const jobStatisticsDataMonthly = [
  { month: "Jan", jobs: 45 },
  { month: "Feb", jobs: 52 },
  { month: "Mar", jobs: 48 },
  { month: "Apr", jobs: 61 },
  { month: "May", jobs: 55 },
  { month: "Jun", jobs: 67 },
  { month: "Jul", jobs: 72 },
  { month: "Aug", jobs: 68 },
  { month: "Sep", jobs: 58 },
  { month: "Oct", jobs: 64 },
  { month: "Nov", jobs: 71 },
  { month: "Dec", jobs: 75 },
];

const jobStatisticsDataWeekly = [
  { month: "Week 1", jobs: 12 },
  { month: "Week 2", jobs: 18 },
  { month: "Week 3", jobs: 15 },
  { month: "Week 4", jobs: 22 },
  { month: "Week 5", jobs: 19 },
];

const jobStatisticsDataYearly = [
  { month: "2020", jobs: 450 },
  { month: "2021", jobs: 520 },
  { month: "2022", jobs: 680 },
  { month: "2023", jobs: 720 },
  { month: "2024", jobs: 750 },
];

// Mock data for Working Format
const workingFormatData = [
  { name: "Onsite", value: 45, color: "#FFA500" },
  { name: "Remote", value: 65, color: "#22C55E" },
  { name: "Hybrid", value: 15, color: "#A78BFA" },
];

// Mock data for Top Candidates
const topCandidatesData = [
  {
    id: 1,
    name: "Jane Cooper",
    position: "Product Manager",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    location: "United States",
    availability: "Full time",
    availabilityColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Floyd Miles",
    position: "Software Engineer",
    phone: "(305) 555-0100",
    email: "floyd@yahoo.com",
    location: "Kiribati",
    availability: "Part time",
    availabilityColor: "bg-blue-100 text-blue-700",
  },
];

export default function RecruiterDashboardOverview() {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [searchQuery, setSearchQuery] = useState("");

  const getChartData = () => {
    switch (timePeriod) {
      case "Weekly":
        return jobStatisticsDataWeekly;
      case "Yearly":
        return jobStatisticsDataYearly;
      default:
        return jobStatisticsDataMonthly;
    }
  };

  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return topCandidatesData;

    const query = searchQuery.toLowerCase();
    return topCandidatesData.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.phone.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.location.toLowerCase().includes(query) ||
        candidate.availability.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Jobs Posted Card */}
        <Card className="bg-white border-0 shadow-sm rounded-xl">
          <CardHeader className="space-y-0 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-4 w-4 text-red-600" />
              </div>
              <CardTitle className="text-xs font-medium text-gray-500">
                Jobs Posted
              </CardTitle>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">98</div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                <TrendingUp className="h-3 w-3" />
                22%
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Total Applicants Card */}
        <Card className="bg-white border-0 shadow-sm rounded-xl">
          <CardHeader className="space-y-0 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-xs font-medium text-gray-500">
                Total Applicants
              </CardTitle>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">145</div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                <TrendingUp className="h-3 w-3" />
                15%
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Interviews Card */}
        <Card className="bg-white border-0 shadow-sm rounded-xl">
          <CardHeader className="space-y-0 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
              <CardTitle className="text-xs font-medium text-gray-500">
                Interviews
              </CardTitle>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">4</div>
              <div className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-md">
                <TrendingDown className="h-3 w-3" />
                7%
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* New Hires Card */}
        <Card className="bg-white border-0 shadow-sm rounded-xl">
          <CardHeader className="space-y-0 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-xs font-medium text-gray-500">
                New Hires
              </CardTitle>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">19</div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                <TrendingUp className="h-3 w-3" />
                42%
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Job Statistics Chart - 2/3 width */}
        <Card className="bg-white border-0 shadow-sm rounded-xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold text-gray-900">
              Job Statistics
            </CardTitle>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={getChartData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Bar dataKey="jobs" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Working Format Pie Chart - 1/3 width */}
        <Card className="bg-white border-0 shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-gray-900">
              Working Format
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={workingFormatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {workingFormatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => {
                      const total = workingFormatData.reduce(
                        (sum, item) => sum + item.value,
                        0
                      );
                      const percentage = ((value / total) * 100).toFixed(1);
                      return [`${value} (${percentage}%)`, "Count"];
                    }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">125</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 text-xs justify-center flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-gray-600">Onsite</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Remote</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-gray-600">Hybrid</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-gray-900">
              Top candidates
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, position, phone, email, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48 sm:w-64 border-gray-300 text-sm rounded-lg"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {candidate.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {candidate.position}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {candidate.phone}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {candidate.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {candidate.location}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${candidate.availabilityColor}`}
                      >
                        {candidate.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
