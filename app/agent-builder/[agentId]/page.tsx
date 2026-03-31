"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../_components/Header";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Panel,
  OnSelectionChangeParams,
  useOnSelectionChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/Types/AgentType";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import EndNode from "../_customNodes/EndNode";
import IfElseNode from "../_customNodes/IfElseNode";
import WhileNode from "../_customNodes/WhileNode";
import UserApprovalNode from "../_customNodes/UserApprovalNode";
import ApiNode from "../_customNodes/ApiNode";
import SettingPanel from "../_components/SettingPanel";


export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApprovalNode: UserApprovalNode,
  ApiNode: ApiNode
};

function AgentBuilder() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const { agentId } = useParams();

  const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges, setSelectedNode } =
    useContext(WorkflowContext);
  const convex = useConvex();
  const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail);
  const [agentDetail, setAgentDetail] = useState<Agent>();

  // 🔹 Fetch Agent Detail
  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string,
    });
    setAgentDetail(result);
  };

  useEffect(() => {
      const run = async () => {
        await GetAgentDetail();
      };
      run();
    }, []);


useEffect(() => {
  if (!agentDetail) return;

  const nodesData =
    agentDetail.nodes?.length > 0
      ? agentDetail.nodes
      : [
          {
            id: "start",
            position: { x: 0, y: 0 },
            data: { label: "Start" },
            type: "StartNode",
          },
        ];

  const edgesData = agentDetail.edges || [];

  setNodes(nodesData);
  setEdges(edgesData);
  setAddedNodes(nodesData);
//   setAddedNodes((prev) =>
//   nodesData.length > 0 ? nodesData : prev
// );
  setNodeEdges(edgesData);
}, [agentDetail]);


  useEffect(() => {
  if (!addedNodes) return;
  setNodes(addedNodes);
}, [addedNodes]);

  // 🔹 Sync local edges → context
  useEffect(() => {
    edges && setNodeEdges(edges);
  }, [edges]);

  const onNodesChange = useCallback(
  (changes: any) => {
    setNodes((nodesSnapshot) => {
      const updated = applyNodeChanges(changes, nodesSnapshot || []);
      return updated;
    });

    // ✅ update context AFTER
    setAddedNodes((prev: any) => applyNodeChanges(changes, prev));
  },
  [setAddedNodes],
);

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const saveNodesAndEdges = async () => {
    console.log(addedNodes);
    const result = await UpdateAgentDetail({
      //@ts-ignore
      id: agentDetail?._id,
      edges: nodeEdges,
      nodes: addedNodes,
    });
    console.log(result)
    toast.success("Saved!");
  };

  const onNodeSelect = useCallback(({nodes}:OnSelectionChangeParams) => {
    //@ts-ignore
      setSelectedNode(nodes[0]);
      console.log(nodes[0])
  },[])

useOnSelectionChange({
  onChange:onNodeSelect
})

  return (
    <div>
      <Header agentDetail={agentDetail} />
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          {/* @ts-expect-ignore */}
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>
          <Panel position="top-right">
            <SettingPanel />
          </Panel>
          <Panel position="bottom-center">
            <Button onClick={saveNodesAndEdges}>
              {" "}
              <Save /> Save{" "}
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default AgentBuilder;
