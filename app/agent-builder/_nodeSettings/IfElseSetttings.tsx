import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const IfElseSetttings = ({ selectedNode, updateFormData }: any) => {

    const [formData, setFormData] = useState({ ifCondition:'' });
        useEffect(()=>{
            selectedNode && setFormData(selectedNode?.data.settings)
        },[selectedNode])
  return (
    <div>
      <h2 className="font-bold">If / Else</h2>
      <p className="text-gray-500 mt-1">
        Create conditions to branch your workflow
      </p>

      <div className='mt-3'>
        <Label>If</Label>
        <Input 
            value={formData?.ifCondition}
            placeholder='Enter condition e.g output==`any condition`'
            onChange={(e)=>setFormData({ifCondition:e.target.value})}
            
            className='mt-2'/>
      </div>
      
      <Button className='w-full mt-5' onClick={()=>{updateFormData(formData); toast.success("Settings Updated!")}}>Save</Button>
    </div>
  )
}

export default IfElseSetttings
