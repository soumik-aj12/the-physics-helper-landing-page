import { Atom } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
<div className="container mx-auto px-4 py-4 flex justify-between items-center">
  <Link href="/" className="flex items-center space-x-2">
    <Atom className="h-8 w-8 text-blue-600" />
    <span className="text-2xl font-bold text-gray-800">The Physics Helper</span>
  </Link>
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
  <Button>Get Started</Button>
</div>
</header>
  )
}

export default Header