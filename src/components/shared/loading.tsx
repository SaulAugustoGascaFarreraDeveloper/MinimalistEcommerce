import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center '>
        <Loader className='size-24 animate-spin' />
    </div>
  )
}

export default loading