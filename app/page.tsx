import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import CustomCursor from '@/components/CustomCursor'
import React from 'react'

const page = () => {
  return (
    <div className='bg-zinc-950 min-h-screen'>
      <CustomCursor />
      <Navbar />
      <Hero />
      <ProjectsShowcase />
      <Footer />
    </div>
  )
}

export default page