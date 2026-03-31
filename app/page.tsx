import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className=" h-screen flex items-center justify-center">
       <h2 className="bg-amber-600">AI Agent Builder Platform</h2>
       <Button>Subscribe</Button>
       <UserButton />
    </div>
  );
}
