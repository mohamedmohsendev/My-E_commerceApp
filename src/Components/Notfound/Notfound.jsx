import React from 'react'
import img from'./../../assets/images/error.svg'



export const Notfound = () => {
  return (
    <div className='h-screen bg-white-600 flex justify-center items-center text-4xl'>
      <img src={img} alt="" />
    </div>
  )
}
