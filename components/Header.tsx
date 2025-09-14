"use client";
import { Atom, LogIn, LogOut, User, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NotificationBell } from "./NotificationBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm rounded-b-lg transition-shadow duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Atom className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">
            The Physics Helper
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center justify-center md:space-x-6">
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/admission" className="text-gray-600 hover:text-blue-600">
              Admission
            </Link>
            <Link href="/exam-centre" className="text-gray-600 hover:text-blue-600">
              Exam Centre
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>

          <NotificationBell />

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {user ? (
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-600 hover:text-red-600"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="default" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="max-w-[220px]">
                    <div className="truncate">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/admission")}>
                    Admission
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/exam-centre")}>
                    Exam Centre
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/contact")}>
                    Contact
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
