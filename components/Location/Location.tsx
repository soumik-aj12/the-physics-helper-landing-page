
import React from 'react'
import GMaps from './GMaps';

const Location = () => {
  return (
    <section id="locate" className="py-20 bg-blue-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Your Physics Journey?</h2>
      <p className="text-xl mb-8">Join The Physics Helper today and unlock the mysteries of the universe.</p>
      <GMaps/>
    </div>
  </section>
  )
}

export default Location