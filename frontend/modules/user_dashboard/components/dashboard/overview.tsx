"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Users,
  Calendar,
  Gift,
  TrendingUp,
  TrendingDown,
  Briefcase,
  MapPin,
  Clock,
  Search,
} from "lucide-react";

export default function UserDashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Applications Sent
              </CardTitle>
              <div className="text-4xl font-bold mt-2">140</div>
              <div className="flex items-center gap-1 mt-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded w-fit">
                <TrendingUp className="h-3 w-3" />
                22%
              </div>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Applications
              </CardTitle>
              <div className="text-4xl font-bold mt-2">39</div>
              <div className="flex items-center gap-1 mt-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded w-fit">
                <TrendingUp className="h-3 w-3" />
                15%
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Interviews
              </CardTitle>
              <div className="text-4xl font-bold mt-2">19</div>
              <div className="flex items-center gap-1 mt-2 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded w-fit">
                <TrendingDown className="h-3 w-3" />
                7%
              </div>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">
                Offers Received
              </CardTitle>
              <div className="text-4xl font-bold mt-2">8</div>
              <div className="flex items-center gap-1 mt-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded w-fit">
                <TrendingUp className="h-3 w-3" />
                42%
              </div>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Gift className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Latest Job Posts
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((idx) => (
            <Card key={idx} className="bg-white border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">
                      asana
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Web Developer
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 line-clamp-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Doloremque atque, praesentium quam iure magnam quas enim, ea
                  rem a
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    full time
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    29 Applied
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />2 days left
                  </div>
                </div>
                <Button className="w-full bg-black hover:bg-gray-900 text-white">
                  Apply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Latest Application Status
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-9 w-64 border-gray-200"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Applied On
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-sm text-gray-900">Microsoft</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    Product Manager
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    17 October 2025
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    jane@microsoft.com
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    United States
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                      Accepted
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 text-sm text-gray-900">Google</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    Software Engineer
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    10 October 2025
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    floyd@yahoo.com
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">Kiribati</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                      In Progress
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
