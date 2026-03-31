import { Handle, Position } from '@xyflow/react'
import { Play } from 'lucide-react'
import React from 'react'

function StartNode() {
  return (
    <div className='bg-white rounded-2xl border p-2 px-3'>
        <div className='flex items-center gap-2'>
            <Play className='p-2 rounded-lg w-8 h-8 bg-yellow-100'/>
            <h2>Start</h2>
        </div>
        <Handle type='source' position={Position.Right}/>
    </div>
  )
}

export default StartNode