import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'

const UserApproval = ({ selectedNode, updateFormData }: any) => {
    
        const [formData, setFormData] = useState({ name:'', message:'' });
            useEffect(()=>{
                selectedNode && setFormData(selectedNode?.data.settings)
            },[selectedNode])

         const handleChange=(key:string,value:any)=>{
                setFormData((prev)=>({
                  ...prev,
                  [key]:value
                }))
          }
        
          const onSave = () => {
            console.log(formData)
            updateFormData(formData)
            toast.success("Settings Updated!")
          }
  return (
    <div>
      <h2 className="font-bold">User Approval</h2>
      <p className="text-gray-500 mt-1">
        Pause for a human to approve or reject a step
      </p>

        <div className="mt-3 space-y-1">
                <Label>Name</Label>
                <Input placeholder="Name"
                value={formData?.name}
                 onChange={(evt)=>handleChange('name', evt.target.value)} />
              </div>
              <div className="mt-3 space-y-1">
                <Label>Message</Label>
                <Textarea placeholder="Describe the message to show the user"
                value={formData?.message}
                 onChange={(evt)=>handleChange('message', evt.target.value)} />
                <h2 className="text-sm p-1 flex gap-2 items-center">
                  Add Context <FileJson className="h-3 w-3" />
                </h2>
                <Button className="w-full mt-5" onClick={onSave}>Save</Button>
              </div>
    </div>
  )
}

export default UserApproval
