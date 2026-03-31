import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAgent from "./MyAgent";

const AiAgentTab = () => {
  return (
    <div className="px-10 md:px-24 lg:px-32 mt-14">
      <Tabs defaultValue="myagent" className="w-full">
        <TabsList>
          <TabsTrigger value="myagent">My Agent</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        <TabsContent value="myagent">
          <MyAgent/>
        </TabsContent>
        <TabsContent value="template">Template</TabsContent>
      </Tabs>
    </div>
  );
};

export default AiAgentTab;
