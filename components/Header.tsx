import { Atom } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button';
import { NotificationBell } from './NotificationBell';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm rounded-lg transition-shadow duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Atom className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">The Physics Helper</span>
          </Link>
          <div className="flex items-center justify-center md:space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link href="#about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#programs" className="text-gray-600 hover:text-blue-600">
                Programs
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </nav>
            <NotificationBell />
          </div>
        </div>
      </header>
  )
}

export default Header