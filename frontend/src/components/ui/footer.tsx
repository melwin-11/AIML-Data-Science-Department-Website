"use client";

import React from "react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-[#0A1A2F] text-white py-8 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* University Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              CHRIST(DEEMED TO BE UNIVERSITY)
            </h2>
            <div className="space-y-2 text-sm">
              <p>Kanmanike, Kumbalgodu, Mysore Road, Bangalore, Karnataka-560074</p>
              <p>Tel: 080 62689800 / 9828 / 9820 / 9800</p>
              <p>Bengaluru, Karnataka 560074</p>
              <p>Fax: +91 806268 9820</p>
              <p>Email: admissions.kengeri@christuniversity.in</p>
            </div>
          </div>

          {/* Relevant Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Relevant Links</h2>
            <div className="space-y-2">
              <a className="block text-blue-300 hover:text-blue-100 hover:underline cursor-pointer transition-colors">
                UBA
              </a>
              <a className="block text-blue-300 hover:text-blue-100 hover:underline cursor-pointer transition-colors">
                FCRA
              </a>
              <a className="block text-blue-300 hover:text-blue-100 hover:underline cursor-pointer transition-colors">
                ALUMNI
              </a>
              <a className="block text-blue-300 hover:text-blue-100 hover:underline cursor-pointer transition-colors">
                IQAC
              </a>
              <a className="block text-blue-300 hover:text-blue-100 hover:underline cursor-pointer transition-colors">
                CAREERS
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="mt-8 pt-6 border-t border-gray-600 text-center text-sm text-gray-300">
          A collaborative creation by Melwin, Sania, Tom, Shawn Luke, and Shawn Joseph.
        </div>
      </div>
    </footer>
  );
}
