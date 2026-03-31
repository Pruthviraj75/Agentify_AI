import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileJson } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function AgentSettings({ selectedNode, updateFormData }: any) {

  const [formData, setFormData] = useState({
    name:'',
    instruction:'',
    includeHistory:true,
    model:'gemini-flash-1.5',
    output:'text',
    schema:''
  })

  useEffect(()=>{
    selectedNode && setFormData(selectedNode?.data?.settings)
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
      <h2 className="font-bold">Agent</h2>
      <p className="text-gray-500 mt-1">
        Call the AI model with your instruction
      </p>

      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input placeholder="Agent Name"
        value={formData?.name}
         onChange={(evt)=>handleChange('name', evt.target.value)} />
      </div>
      <div className="mt-3 space-y-1">
        <Label>Instruction</Label>
        <Textarea placeholder="Instruction"
        value={formData?.instruction}
         onChange={(evt)=>handleChange('instruction', evt.target.value)} />
        <h2 className="text-sm p-1 flex gap-2 items-center">
          Add Context <FileJson className="h-3 w-3" />
        </h2>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Label>Include Chat History</Label>
        <Switch checked={formData?.includeHistory}
        onCheckedChange={(evt)=>handleChange('includeHistory',evt.target.value)} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Label>Model</Label>
        <Select
         value={formData?.model}
         onValueChange={(value)=>handleChange('model',value)}>
          <SelectTrigger>
            <SelectValue placeholder="gemini flash 1.5"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
            <SelectItem value="gemini-pro-1.5">Gemini Pro 1.5</SelectItem>
            <SelectItem value="gemini-pro-2.0">Gemini Pro 2.0</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 space-y-2">
        <Label>Output Format</Label>
        <Tabs 
         defaultValue="Text"
         value={formData?.output}
         className="w-100"
         onValueChange={(value)=>handleChange('output',value)}>
          <TabsList>
            <TabsTrigger value="Text">Text</TabsTrigger>
            <TabsTrigger value="Json">Json</TabsTrigger>
          </TabsList>
          <TabsContent value="Text">
            <h2 className="text-sm text-gray-500">Output will be text.</h2> 
          </TabsContent>
          <TabsContent value="Json">
            <Label className="text-sm text-gray-500">Enter Json Schema</Label>
            <Textarea
             value={formData?.schema}
             placeholder='{title:string}'
             className="max-w-75 mt-1"
            onChange={(evt)=>handleChange('schema',evt.target.value)} />
          </TabsContent>
        </Tabs>
      </div>
      <Button className="w-full mt-5" onClick={onSave}>Save</Button>
    </div>
  );
}

export default AgentSettings;
