import React from "react";
import { Handle, Position } from "@xyflow/react";
import { MousePointer2 } from "lucide-react";
function AgentNode({ data }: any) {
  return (
    <div className="bg-white rounded-2xl border p-2 px-3">
      <div className="flex items-center gap-2">
        <MousePointer2
          className="p-2 rounded-lg w-8 h-8"
          style={{
            backgroundColor: data?.bgColor,
          }}
        />
        <div className="flex flex-col ">
          <h2>{data?.label}</h2>
          <p className="text-xs text-gray-500">Agent</p>
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default AgentNode;
