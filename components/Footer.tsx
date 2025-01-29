import { Atom } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <Atom className="h-6 w-6" />
                <span className="text-xl font-bold">The Physics Helper</span>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} The Physics Helper. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default Footer