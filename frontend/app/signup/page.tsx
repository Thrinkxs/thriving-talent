"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState("")
  const [uploadedFile, setUploadedFile] = useState<string>("")
  const [videoFile, setVideoFile] = useState<string>("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 30
        })
      }, 500)
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file.name)
      setVideoProgress(0)
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 25
        })
      }, 600)
    }
  }

  const handleNextStep = () => {
    if (role) {
      setStep(2)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Step 1: Select Role */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-full">
            <Image src="/signup side image.jpg" alt="Team" fill className="object-cover" />
            <div className="absolute top-10 left-6 w-64 h-16">
              <Image src="/thriving talent logo.png" alt="Thriving Talents" fill className="object-contain" />
            </div>
          </div>

          {/* Right Side - Role Selection */}
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-sans">Select your role</h2>

              <div className="space-y-4">
                {/* Employer Button */}
                <button
                  onClick={() => handleRoleSelect("employer")}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-base font-sans border-2 ${
                    role === "employer"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-blue-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  Employer
                </button>

                {/* Intern Button */}
                <button
                  onClick={() => handleRoleSelect("intern")}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-base font-sans border-2 ${
                    role === "intern"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-blue-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  Intern
                </button>
              </div>

              <button
                onClick={handleNextStep}
                disabled={!role}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 text-base font-sans"
              >
                Next
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-8 font-sans">
                Already Have An Account ?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-full">
            <Image src="/signup side image.jpg" alt="Team" fill className="object-cover" />
            <div className="absolute top-10 left-6 w-64 h-16">
              <Image src="/thriving talent logo.png" alt="Thriving Talents" fill className="object-contain" />
            </div>
          </div>

          {/* Right Side - Upload Form */}
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Upload your CV</h2>
              <p className="text-gray-600 text-sm mb-8 font-sans">Upload your CV in PDF or DOCX format.</p>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <svg
                  className="w-12 h-12 mx-auto text-blue-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600 text-sm mb-2 font-sans">
                  Drag & drop files or{" "}
                  <label className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                    Browse
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.docx,.png,.jpg,.xls"
                    />
                  </label>
                </p>
                <p className="text-gray-500 text-xs font-sans">
                  Supported formats: JPEG, PNG, GIF, JPG, PDF, XLS, AI, Word, JPF
                </p>
              </div>

              {uploadedFile && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2 font-sans">Uploading</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-sans mb-2">{uploadedFile}</p>
                      <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedFile("")
                        setUploadProgress(0)
                      }}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Next Button */}
              <button
                onClick={() => setStep(3)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 text-base font-sans"
              >
                Next
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-8 font-sans">
                Already Have An Account ?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-full">
            <Image src="/signup side image.jpg" alt="Team" fill className="object-cover" />
            <div className="absolute top-10 left-6 w-64 h-16">
              <Image src="/thriving talent logo.png" alt="Thriving Talents" fill className="object-contain" />
            </div>
          </div>

          {/* Right Side - Video Upload Form */}
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Introduce yourself</h2>
              <p className="text-gray-600 text-sm mb-8 font-sans">
                Submit a short video (2 - 3 minutes) to showcase your skills and personality. This is your chance to
                make a great first impression!
              </p>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <svg
                  className="w-12 h-12 mx-auto text-blue-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600 text-sm mb-2 font-sans">
                  Drag & drop files or{" "}
                  <label className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                    Browse
                    <input type="file" onChange={handleVideoUpload} className="hidden" accept=".mp4,.mov,.avi,.mkv" />
                  </label>
                </p>
                <p className="text-gray-500 text-xs font-sans">Supported formats: MP4</p>
              </div>

              {videoFile && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2 font-sans">Uploading</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-sans mb-2">{videoFile}</p>
                      <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setVideoFile("")
                        setVideoProgress(0)
                      }}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Finish Button */}
              <button
                onClick={() => {
                  alert("Signup completed!")
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 text-base font-sans"
              >
                Finish
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm mt-8 font-sans">
                Already Have An Account ?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
