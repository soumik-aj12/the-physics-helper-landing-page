import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <main className='flex-grow'>
          {children}
        </main>
    </div>
  )
}

export default Wrapper