"use client";

import { useEffect, useState } from "react";

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      id: 1,
      number: "4K +",
      label: "Organisations trust",
      bgGradient: "bg-gradient-to-tr from-blue-900 to-blue-600",
      position: "lg:col-start-2 lg:row-start-1",
    },
    {
      id: 2,
      number: "78 %",
      label: "Reduced Manual Work",
      bgGradient: "bg-gradient-to-tr from-red-700 to-red-500",
      position: "lg:col-start-3 lg:row-start-1",
    },
    {
      id: 3,
      number: "60 %",
      label: "Reduces Administration Time",
      bgGradient: "bg-gradient-to-tr from-lime-500 to-lime-300",
      position: "lg:col-start-2 lg:row-start-2 lg:col-span-1",
    },
  ];

  return (
    <section className="relative min-h-screen bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.08) 75%, rgba(0, 0, 0, 0.08) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.08) 75%, rgba(0, 0, 0, 0.08) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        {/* Heading */}
        <div
          className={`mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-sm sm:text-base font-medium text-gray-600 mb-4 sm:mb-6">
            Why choose us?
          </h2>
        </div>

        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-3 items-end">
          {/* Left Content */}
          <div
            className={`mt-20 md:mt-0 lg:col-span-1 flex flex-col justify-end transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold leading-tight text-black">
              Empower HR with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FE2728 49.04%, #2020D0 100%)",
                  whiteSpace: "nowrap",
                }}
              >
                AI-driven
              </span>{" "}
              tools to optimize teams,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #000000 0%, #606060 100%)",
                }}
              >
                boost productivity, and drive success
              </span>
            </h3>
          </div>

          {/* Right Stats Grid */}
          <div className="mt-20 md:mt-0 lg:col-span-2">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`${
                    stat.bgGradient
                  } rounded-2xl p-6 sm:p-8 text-white transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
                    stat.position
                  } ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  } mt-20`}
                  style={{ transitionDelay: `${500 + index * 200}ms` }}
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none">
                      {stat.number}
                    </div>
                    <p className="text-sm sm:text-base font-medium leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
