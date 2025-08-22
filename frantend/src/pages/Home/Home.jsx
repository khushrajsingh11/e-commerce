import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDowload from '../../components/AppDowload/AppDowload'
function Home() {
  const [category , setCategory] = useState("All")
  return (
    <div className='Home'>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDowload/>
    </div>
  )
}

export default Home