import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TrainCard from './TrainCard'


const Alltrains=()=> {

  const [trains,setTrains]=useState([])

  const getTrains=async()=>{
    const res = await axios.get('http://localhost:3000/trains')
    setTrains(res.data)
  }

  useEffect(()=>{
    getTrains()
  },[])

  useEffect(()=>{
    console.log(trains)
  },[trains])

  return (
    <div className='flex flex-col'>
      <div className='flex w-[100%] justify-end'>
        <div className='cursor-pointer text-normal flex font-medium py-[20px] px-[40px]'>Search Single Train</div>
    </div>
      <div className='flex justify-center text-xl'>
      ALL Trains
      </div>
      <div>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Train List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {trains.map((train, index) => (
          <TrainCard key={index} train={train} />
        ))}
      </div>
    </div>

      </div>
    </div>

  )
}

export default Alltrains