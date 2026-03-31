import React from 'react'
import { Square } from 'lucide-react'
import { Handle, Position } from '@xyflow/react'

function EndNode({data}:any) {
  return (
        <div className='bg-white rounded-2xl border p-2 px-3'>
                <div className='flex items-center gap-2'>
                    <Square className='p-2 rounded-lg w-8 h-8'
                    style={{
                        backgroundColor:data?.bgColor
                    }}
                    />
                    <h2>End</h2>
                </div>
                <Handle type='target' position={Position.Left} />
            </div>
  )
}

export default EndNode