import React from 'react'
import Header from '../components/Header'
import FeaturedCottages from '../components/FeaturedCottages'
import FeaturedAmenities from '../components/FeaturedAmenities'
import PerfectLocation from '../components/PerfectLocation'

const Home = () => {
  return (
    <div>
      <Header />
      <FeaturedCottages />
      <FeaturedAmenities />
      <PerfectLocation />
    </div>
  )
}

export default Home