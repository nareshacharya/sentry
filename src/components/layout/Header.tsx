"use client";

import { useState } from "react";
import { useTheme } from "@/components";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Residents", href: "/residents" },
  { label: "Payments", href: "/payments" },
  { label: "Notices", href: "/notices" },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-xl font-bold">
          Sentry 🏢
        </Link>
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <span className="text-sm">Welcome, Naresh</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
