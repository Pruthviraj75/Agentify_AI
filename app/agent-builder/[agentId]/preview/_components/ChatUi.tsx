import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, RefreshCcwIcon, Send } from "lucide-react";
import { Agent } from "@/Types/AgentType";
import Markdown from "react-markdown";
// import remarkGfm from 'remark-gfm'

type Props = {
  GenerateAgentToolConfig: () => void;
  loading: boolean;
  agentDetail: Agent;
  conversationId: string | null;
};

const ChatUi = ({
  GenerateAgentToolConfig,
  loading,
  agentDetail,
  conversationId,
}: Props) => {
  const [userInput, setUserInput] = useState<string>("");
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  
  // 🔥 HANDLE BOTH STRUCTURES (VERY IMPORTANT)
  const toolConfig = agentDetail?.agentToolConfig;

  const tools =
    toolConfig?.tools ||
    toolConfig?.parsedJson?.tools ||
    [];

  const agents =
    toolConfig?.agents ||
    toolConfig?.parsedJson?.agents ||
    [];

  // console.log("🧠 FRONTEND TOOLS:", tools);

  const OnSendMsg = async () => {
    // ❌ STOP if tools not ready (FIXED POSITION)
    if (!tools.length) {
      alert("⚠️ Tools not ready. Click 'Reboot Agent' first.");
      return;
    }

    setLoadingMsg(true);
    setMessages([...messages, { role: "user", content: userInput }]);
    setUserInput("");
try { 
    const res = await fetch("/api/agent-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentName: agentDetail?.name,
        // tools: agentDetail?.config?.tools || [],
        // agents: agentDetail?.config?.agents || [],
        // tools: agentDetail?.agentToolConfig?.tools || [],
        // agents: agentDetail?.agentToolConfig?.agents || [],
        tools,
        agents,
        inputs: userInput,
        conversationId: conversationId,
      }),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        console.log(decoder.decode(value));
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: (updated[updated.length - 1]?.content || "") + chunk,
          };
          return updated;
        });
      }
    }
  } catch (error) {
    console.error("Error during chat:", error);
  }
    setLoadingMsg(false);
  };
  // console.log("🧠 FRONTEND TOOLS:", agentDetail?.agentToolConfig);

  return (
    <div>
      <div className="flex justify-between items-center border-b p-4">
        <h2>{agentDetail?.name}</h2>
        <Button onClick={GenerateAgentToolConfig} disabled={loading}>
          {" "}
          <RefreshCcwIcon className={`${loading && "animate-spin"}`} /> Reboot
          Agent
        </Button>
      </div>
      <div className="w-full h-[80vh] p-4 flex flex-col">
        {/* Message Section*/}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`"p-2 rounded-lg max-w-[80%] "
                ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-300 text-black self-start"
                }
                `}
            >
              {/* <p className="text-sm break-words whitespace-pre-wrap overflow-hidden">{msg.content}</p> */}
              <div className="text-sm break-words whitespace-pre-wrap overflow-hidden">
                <Markdown>{msg?.content}</Markdown>
              </div>
            </div>
          ))}

          {/* Loadin state */}
          {/* <div className="flex items-center justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-gray-300 border-t-gray-700 border-b-gray-700 animate-spin"></div>
            
            <span className="text-zinc-800 text-sm ml-2">Thinking... Working on your request</span>
          </div>
        </div> */}

          {/* Loadin state */}
          {loadingMsg && (
            <div className="flex justify-center items-center gap-3 p-4">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
              <span className="text-zinc-800 text-sm">
                Thinking... Working on your request
              </span>
            </div>
          )}

          {/* Footer Input */}
          <div className="p-1 mt-3 border-t flex items-center gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 resize-none border rounded-lg px-3 py-2"
            />

            {/* <Button
              onClick={OnSendMsg}
              disabled={loadingMsg || !userInput.trim().length}
            >
              { loadingMsg ? <Loader2Icon className="animate-spin"/>  <Send />}</Button>
            </Button> */}

            <Button
              onClick={OnSendMsg}
              disabled={loadingMsg || !userInput.trim().length}
            >
              {loadingMsg ? (<Loader2Icon className="animate-spin" />) : (<Send />)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
