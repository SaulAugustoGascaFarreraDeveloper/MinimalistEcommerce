import { Loader,LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className="flex justify-center">
        <LoaderCircle className='size-24 text-slate-700 animate-spin' />
    </div>
  )
}

export default loading