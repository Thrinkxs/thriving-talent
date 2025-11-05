/**
 * KPIs Info Cards Component for the home dashboard.
 **/
/**
 * KPIs Info Cards Component for the home dashboard.
 **/

import React from "react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface InfoCardsProps {
  icon: React.ReactNode;
  backgroundColor: string;
  title: string;
  value: number;
  percentageChange?: number;
}

const InfoCards = ({
  icon,
  backgroundColor,
  title,
  value,
  percentageChange,
}: InfoCardsProps) => {
  const isPositive = percentageChange !== undefined && percentageChange > 0;

  return (
    <div className="bg-white rounded-3xl p-5 w-[300px]">
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4">
        <div
          className={`${backgroundColor} flex items-center justify-center h-12 w-12 rounded-full`}
        >
          {icon}
        </div>
        <p className="text-gray-700 font-medium">{title}</p>
      </div>

      {/* Value + Change */}
      <div className="flex justify-between items-center mt-5">
        <p className="font-bold text-4xl text-gray-900">{value}</p>

        {percentageChange !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-2 rounded-xl text-black ${
              isPositive ? "bg-thrive-green" : "bg-thrive-dark-red"
            }`}
          >
            {isPositive ? (
              <IconTrendingUp size={18} color="black" stroke={2} />
            ) : (
              <IconTrendingDown size={18} color="black" stroke={2} />
            )}
            <span className="font-semibold text-sm">
              {isPositive ? `+${percentageChange}%` : `${percentageChange}%`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCards;
