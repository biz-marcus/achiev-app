"use client";

import { Home, Book, Briefcase, Award, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";

export function SideNav(): React.ReactNode {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: "Sessions",
      icon: <Home className="h-5 w-5" />,
      href: "/",
      active: pathname === "/" || pathname === "/chat",
    },
    {
      name: "Applications",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/applications",
      active: pathname === "/applications",
    },
    {
      name: "Achievements",
      icon: <Award className="h-5 w-5" />,
      href: "/achievements",
      active: pathname === "/achievements",
    },
  ];

  return (
    <div className="flex flex-col h-full border-r border-gray-200">
      {/* Logo - now left-aligned */}
      <div className="p-4">
        <div className="flex items-center justify-start pl-3">
          <Image
            src="/images/logo.png"
            alt="Achiev Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  item.active
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="hidden md:block">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User/Settings - with profile image and username */}
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div className="relative flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">
              J
            </div>
          </div>
          <div className="hidden md:block">
            <div className="font-medium">Jane Doe</div>
            <div className="text-xs text-gray-500">Settings</div>
          </div>
        </Link>
      </div>
    </div>
  );
} 