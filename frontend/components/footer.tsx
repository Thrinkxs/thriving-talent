"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="relative w-32 h-12 mb-4">
              <Image src="/thriving talent logo.png" alt="Thriving Talents Logo" fill className="object-contain" />
            </div>
          </div>

          {/* Learn More Section */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-300">Learn More</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-300">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-400 text-sm">
                  <p className="font-medium">Hotel Reservation</p>
                  <p>123-456-7890</p>
                </div>
              </li>
              <li>
                <div className="text-gray-400 text-sm">
                  <p className="font-medium">Email</p>
                  <p>thrivingtalents@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-300">Social</h3>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-500 text-sm">© 2025 Thriving Talents. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
