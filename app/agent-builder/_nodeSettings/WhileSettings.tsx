import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const WhileSettings = ({ selectedNode, updateFormData }: any ) => {
    
        const [formData, setFormData] = useState({ whileCondition:'' });
            useEffect(()=>{
                selectedNode && setFormData(selectedNode?.data.settings)
            },[selectedNode])
  return (
    <div>
          <h2 className="font-bold">While</h2>
          <p className="text-gray-500 mt-1">
            Loop your Logic
          </p>
    
          <div className='mt-3'>
            <Label>While</Label>
            <Input 
                value={formData?.whileCondition}
                placeholder='Enter condition e.g output==`any condition`'
                onChange={(e)=>setFormData({whileCondition:e.target.value})}
                
                className='mt-2'/>
          </div>
          
          <Button className='w-full mt-5' onClick={()=>{updateFormData(formData); toast.success("Settings Updated!")}}>Save</Button>
        </div>
  )
}

export default WhileSettings
