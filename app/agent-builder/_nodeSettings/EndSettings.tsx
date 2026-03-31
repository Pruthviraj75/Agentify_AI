import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const EndSettings = ({ selectedNode, updateFormData }: any) => {

    const [formData, setFormData] = useState({ schema:'' });
    useEffect(()=>{
        selectedNode && setFormData(selectedNode?.data.settings)
    },[selectedNode])
  return (
    <div>
      <h2 className="font-bold">End</h2>
      <p className="text-gray-500 mt-1">
        Choose the workflow output
      </p>

      <div className='mt-2 space-y-2'>
        <Label>Output</Label>
        <Textarea
        value={formData?.schema}
         onChange={(e)=>setFormData({schema:e.target.value})}
         placeholder='{title:string}' />
      </div>

      <Button className='w-full mt-5' onClick={()=>{updateFormData(formData); toast.success("Settings Updated!")}}>Save</Button>
    </div>
  )
}

export default EndSettings
