// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { CodeBlock } from "@/components/ui/code-block";

// type Props = {
//   openDialog: boolean;
//   setOpenDialog: (open: boolean) => void;
// };

// const PublishCodeDialog = ({ openDialog, setOpenDialog }: Props) => {
//   const code = `const res = await fetch("https://agentify.com/api/agent-chat", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     agentId:<agentId>,
//     userId:<userId>,
//     userInput: <userInput>,
//   }),
// });

// if (!res.body) return;

// const reader = res.body.getReader();
// const decoder = new TextDecoder();
// let done = false;

// while (!done) {
//   const { value, done: doneReading } = await reader.read();
//   done = doneReading;

//   if (value) {
//     const chunk = decoder.decode(value);
//     console.log(chunk);
//   }
// }`;

//   return (
//     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//       <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
        
//         {/* Header */}
//         <div className="px-6 py-4 border-b bg-muted/40">
//           <DialogTitle className="text-lg font-semibold">
//             Get Code
//           </DialogTitle>
//           <DialogDescription className="text-sm text-muted-foreground mt-1">
//             Copy and use this API integration in your project.
//           </DialogDescription>
//         </div>

//         {/* Code Section */}
//         <div className="p-4 bg-zinc-50">
//           <div className="max-h-100 overflow-y-auto rounded-lg border text-black">
//             <CodeBlock code={code} />
//           </div>
//         </div>

//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PublishCodeDialog;





import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CodeBlock } from "@/components/ui/code-block";

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  agentId?: string;
};

const PublishCodeDialog = ({ openDialog, setOpenDialog, agentId }: Props) => {
  const code = `const response = await fetch("https://your-domain.com/api/agent-chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agentId: "${agentId ?? "<YOUR_AGENT_ID>"}",
    userId: "<YOUR_USER_ID>",
    userInput: "<USER_MESSAGE>",
  }),
});

if (!response.body) return;

const reader = response.body.getReader();
const decoder = new TextDecoder();
let result = "";

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  result += chunk;
  console.log("chunk:", chunk);
}

console.log("Final response:", result);`;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {/*
        FIX 1: sm:max-w-[780px] gives enough width so code never clips.
        w-[95vw] ensures it doesn't overflow on small screens.
      */}
      <DialogContent className="p-0 overflow-hidden rounded-2xl w-[95vw] sm:max-w-195">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white">
          <DialogTitle className="text-base font-semibold text-gray-900">
            🚀 Get Code
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-0.5">
            Copy and use this snippet in your app to call your AI agent.
          </DialogDescription>
        </div>

        {/* Code — no padding that would shrink it, dark bg flush to edges */}
        <div style={{ background: "#1e1e2e", padding: "16px" }}>
          <CodeBlock
            code={code}
            language="typescript"
            fileName="agent-integration.ts"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishCodeDialog;