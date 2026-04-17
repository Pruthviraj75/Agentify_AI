"use client";

import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/Types/AgentType";
import { ReactFlow } from "@xyflow/react";
import { nodeTypes } from "../page";
import "@xyflow/react/dist/style.css";
import axios from "axios"
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import ChatUi from "./_components/ChatUi";
import PublishCodeDialog from "./_components/PublishCodeDialog";

const PreviewAgent = () => {
//   const convex = useConvex();
//   const { agentId } = useParams();
//   const [agentDetail, setAgentDetail] = useState<Agent>();

//   const GetAgentDetail = async () => {
//     const result = await convex.query(api.agent.GetAgentById, {
//       agentId: agentId as string,
//     });
//     setAgentDetail(result);
//   };
//   useEffect(() => {
//     const run = async () => {
//       await GetAgentDetail();
//     };
//     run();
//   }, []);



  // 🧠 Store the agent detail fetched from Convex (nodes + edges)
const [agentDetail, setAgentDetail] = useState<Agent>();
const [flowConfig, setFlowConfig] = useState<any>(null);
const [loading, setLoading] = useState(false)
const updateAgentToolConfig=useMutation(api.agent.updateAgentToolConfig) 
const [conversationId, setConversationId] = useState<string|null>(null)
const [openDialog, setOpenDialog] = useState(false);

// ⚙️ Convex client instance
const convex = useConvex();

// 🔑 Get agentId from URL params (e.g., /agent/[agentId])
const { agentId } = useParams();

// ⚙️ Store generated workflow config
// const [config, setConfig] = useState<any>();

// 📡 Convex query to fetch agent detail by ID
const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
        agentId: agentId as string
    });
    setAgentDetail(result);

    //Get Conversation ID if not 
    const conversationIdResult = await axios.get('/api/agent-chat');
    // console.log(conversationIdResult.data);
    setConversationId(conversationIdResult.data)
}

// 📦 Fetch agent details when component mounts
useEffect(() => {
    GetAgentDetail();
}, [])

// ⚙️ Generate workflow config (node/edge relationship)
const GenerateWorkflow = () => {
    // 🧩 Build Edge Map for quick source → target lookup
    const edgeMap = agentDetail?.edges?.reduce((acc: any, edge: any) => {
        if (!acc[edge.source]) acc[edge.source] = [];
        acc[edge.source].push(edge);
        return acc;
    }, {});

    // 🔄 Build flow array by mapping each node
    const flow = agentDetail?.nodes?.map((node: any) => {
        const connectedEdges = edgeMap[node.id] || [];
        let next: any = null;

        switch (node.type) {
            // 🧭 Conditional branching node with "if" and "else"
            case "IfElseNode": {
                const ifEdge = connectedEdges.find((e: any) => e.sourceHandle === "if");
                const elseEdge = connectedEdges.find((e: any) => e.sourceHandle === "else");

                next = {
                    if: ifEdge?.target || null,
                    else: elseEdge?.target || null,
                };
                break;
            }

            // 🧠 Agent or AI Node
            case "AgentNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e: any) => e.target);
                }
                break;
            }

            // 🔗 API Call Node
            case "ApiNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // ✅ User Approval Node (manual checkpoint)
            case "UserApprovalNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // 🚀 Start Node
            case "StartNode": {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                }
                break;
            }

            // 🏁 End Node
            case "EndNode": {
                next = null; // No next node
                break;
            }

            // 🔧 Default handling for any unknown node type
            default: {
                if (connectedEdges.length === 1) {
                    next = connectedEdges[0].target;
                } else if (connectedEdges.length > 1) {
                    next = connectedEdges.map((e: any) => e.target);
                }
                break;
            }
        }

        // 🧱 Return a simplified node configuration
        return {
            id: node.id,
            type: node.type,
            label: node.data?.label || node.type,
            settings: node.data?.settings || {},
            next,
        };
    });

    // 🎯 Find the Start Node
    const startNode = agentDetail?.nodes?.find((n: any) => n.type === "StartNode");

    // 🧱 Final Config structure
    const config = {
        startNode: startNode?.id || null,
        flow,
    };
    
    setFlowConfig(config)

    // console.log("✅ Generated Workflow Config:", config);
    // console.log("✅ Generated Workflow Config:", JSON.stringify(config));
}

// 🧩 Generate workflow once agent data is loaded
useEffect(() => {
    if (agentDetail) {
        GenerateWorkflow()
    }
}, [agentDetail])

const GenerateAgentToolConfig= async ()=>{
    
    setLoading(true)
    const result = await axios.post('/api/generate-agent-tool-config',{
        jsonConfig:flowConfig
    })

    // console.log(result.data)
    //update to our DB
    // await updateAgentToolConfig({
    //      id: agentDetail?._id as any,
    //     //  agentToolConfig: result.data
    //      agentToolConfig: result.data.parsedJson
    // })
    const newConfig = result.data.parsedJson;

await updateAgentToolConfig({
  id: agentDetail?._id as any,
  agentToolConfig: newConfig
});

// 🔥 FORCE UPDATE LOCALLY (VERY IMPORTANT)
setAgentDetail((prev: any) => ({
  ...prev,
  agentToolConfig: newConfig
}));
    // GetAgentDetail();
    setLoading(false);

}

const OnPublish=()=>{
   setOpenDialog(true);
}

  return (
    <div>
      <Header previewHeader={true} agentDetail={agentDetail} onPublish={OnPublish} />
      <div className="grid grid-cols-5 ">
        <div className="col-span-3 p-5 border rounded-2xl m-5">
          <h2>Preview</h2>
          <div style={{ width: "100%", height: "75vh", backgroundColor: '#f8f8f8', borderRadius: 20 }}>
            <ReactFlow
              nodes={agentDetail?.nodes || []}
              edges={agentDetail?.edges || []}
              fitView
              nodeTypes={nodeTypes}
              draggable={false}
            >
            </ReactFlow>
          </div>
        </div>

        <div className="col-span-2 border rounded-2xl m-5">
          
            {
            !agentDetail?.agentToolConfig ? <div className="flex items-center justify-center h-full">
            <Button 
            onClick={GenerateAgentToolConfig}
            disabled={loading}
            > <RefreshCcwIcon className={`${loading && 'animate-spin'}`} /> Reboot Agent</Button>
          </div>:
          <ChatUi 
          key={agentDetail?.agentToolConfig ? "ready" : "empty"}
          GenerateAgentToolConfig={GenerateAgentToolConfig}
          loading={loading} 
          agentDetail={agentDetail}
          conversationId={conversationId}/>
          }
        </div>
      </div>

      <PublishCodeDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default PreviewAgent;
