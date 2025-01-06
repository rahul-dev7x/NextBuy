import React from 'react'

const ProductCard = ({data}) => {
  return (
    <div className='shadow-md rounded-sm flex flex-col gap-4 p-4 '>
      <img src={data.image[0]} className='w-24 h-24 object-cover'/>
      <p>{data.name}</p> 
      
    </div>
  )
}

export default ProductCard
