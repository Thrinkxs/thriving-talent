"use client";

import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kyle Roberts DVM",
    role: "Customer Web Consultant",
    text: "Website design did exactly what you said it does. Just what I was looking for. Nice work on your website design.",
    image: "/testimonial-1.png",
  },
  {
    id: 2,
    name: "Kyle Roberts DVM",
    role: "Customer Web Consultant",
    text: "Website design did exactly what you said it does. Just what I was looking for. Nice work on your website design.",
    image: "/testimonial-1.png",
  },
  {
    id: 3,
    name: "Sophia Anderson",
    role: "Founder",
    text: "I will let my mum know about this, she could really make use of software! Very easy to use. Since I invested in software I made over 100,000 dollars profits. I just cant get enough of the software. I want to get a T-Shirt with software on it so I can show it off to everyone.",
    image: "/testimonial-2.png",
  },
  {
    id: 4,
    name: "Sophia Anderson",
    role: "Founder",
    text: "I will let my mum know about this, she could really make use of software! Very easy to use. Since I invested in software I made over 100,000 dollars profits. I just cant get enough of the software. I want to get a T-Shirt with software on it so I can show it off to everyone.",
    image: "/testimonial-2.png",
  },
  {
    id: 5,
    name: "Stephen Brekke",
    role: "Product Manager",
    text: "If you want real marketing that works and effective implementation - mobile app's got you covered.",
    image: "/testimonial-3.png",
  },
  {
    id: 6,
    name: "Stephen Brekke",
    role: "Product Manager",
    text: "If you want real marketing that works and effective implementation - mobile app's got you covered.",
    image: "/testimonial-3.png",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-white relative mt-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.01) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hear what our beloved
            <br />
            customers said
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-8 md:gap-10 mt-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative pt-12"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="mt-4 bg-white rounded-2xl p-6 md:p-8 relative"
                style={{
                  boxShadow: "0px 94px 200px 0px #15151526",
                }}
              >
                <div className="absolute -top-10 left-6 md:left-8">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={200}
                    height={200}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  />
                </div>

                <div className="flex gap-1 justify-end mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-xs text-gray-500">Testimonial</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="relative pt-12">
                      <div
                        className="bg-white rounded-2xl p-6 relative"
                        style={{
                          boxShadow: "0px 94px 200px 0px #15151526",
                        }}
                      >
                        <div className="absolute -top-8 left-6">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={200}
                            height={200}
                            className="w-20 h-20  rounded-full object-cover border-4 border-white"
                          />
                        </div>

                        <div className="flex gap-1 justify-end mb-6">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <div className="mb-6">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {testimonial.text}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {testimonial.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                              <ThumbsUp className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-xs text-gray-500">
                              Testimonial
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
