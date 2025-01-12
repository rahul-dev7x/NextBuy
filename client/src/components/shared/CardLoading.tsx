import React from 'react'

const CardLoading = () => {
  return (
    <div className='py-2 px-4 border grid gap-4 min-w-52 animate-pulse cursor-pointer rounded'>
        <div className='min-h-24 bg-blue-100 rounded'></div>
        <div className='w-20 bg-blue-100 p-2 rounded'></div>
        <div className='rounded bg-blue-100 p-4'>
        </div>
        <div className='p-2 bg-blue-100 w-20'></div>
        <div className='flex justify-between items-center'>
            <div className='w-20 bg-blue-100 p-2 rounded'></div>
            <div className='w-20 bg-blue-100 p-2 rounded'></div>
        </div>
    </div>

  )
}

export default CardLoading
