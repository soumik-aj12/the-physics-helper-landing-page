import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { AuthProvider } from '@/components/auth-context'

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    
      <div className="flex flex-col min-h-screen">
        <AuthProvider>
        <Header/>
        <main className='flex-grow'>
          {children}
        </main>
        </AuthProvider>
    </div>
  )
}

export default Wrapper