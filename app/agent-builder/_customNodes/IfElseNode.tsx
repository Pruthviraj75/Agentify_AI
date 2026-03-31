import React from "react";
import { Input } from "@/components/ui/input";
import { Handle, Position } from "@xyflow/react";
import { Merge } from "lucide-react";

const handleStyle={ top: 110 }

function IfElseNode({data}:any) {
  return (
    <div className='bg-white rounded-2xl border p-2 px-3'>
      <div className="flex gap-2 items-center">
        <Merge className="p-2 rounded-lg w-8 h-8"
          style={{
            backgroundColor: data?.bgColor,
          }}
        />
        <h2>If/Else</h2>
      </div>
      <div className="max-w-[140px] flex flex-col gap-2 mt-2">
        <Input placeholder="If Statement" className="text-sm bg-white" disabled/>
        <Input placeholder="Else Statement" className="text-sm bg-white" disabled/>
      </div>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} id={'if'} />
      <Handle type='source' position={Position.Right} id={'else'} 
      style={handleStyle}/>
    </div>
  );
}

export default IfElseNode;
