"use client";

import React, { useContext, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Database,
  Gem,
  Headphones,
  LayoutDashboard,
  User2Icon,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agents",
    url: "/dashboard/my-agents",
    icon: Headphones,
  },

  //i think data should be cut
  {
    title: "Data",
    url: "#",
    icon: Database,
  },
  {
    title: "Pricing",
    url: "/dashboard/pricing",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User2Icon,
  },
];

const AppSidebar = () => {
  const { open } = useSidebar();
  const { userDetail, setUserdetail } = useContext(UserDetailContext);
  const path = usePathname();
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: "unlimited_plan" });
  console.log("isPaidUser", isPaidUser);
  const convex = useConvex();
  const [totalRemainigCredits, setTotalRemainingCredits] =
    React.useState<number>(0);

  const GetUserAgent = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id,
    });

    setTotalRemainingCredits(2 - Number(result?.length || 0)); // Assuming each agent costs 1 credit and user starts with 2 credits
    setUserdetail((prev:any) => ({ ...prev, remainingCredits: 2 - Number(result?.length || 0) }));

    console.log(result);
  };
  useEffect(() => {
    if (!isPaidUser && userDetail) {
      GetUserAgent();
    }
  }, [userDetail]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src={"/ai.png"} alt="logo" width={35} height={35} />
          {open && <h2 className="font-bold text-lg">Agentix</h2>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => {
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      size={open ? "lg" : "sm"}
                      isActive={path == menu?.url}
                    >
                      <Link href={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mb-10">
        {!isPaidUser ? (
          <div>
            <div className="flex items-center gap-2">
              <Gem />
              {open && (
                <h2>
                  Remaining Credits:{" "}
                  <span className="font-bold">{ totalRemainigCredits } / 2</span>
                </h2>
              )}
            </div>
            {open && <Button className="mt-2">Upgrade to Unlimited</Button>}
          </div>
        ) : (
          <div>
            <h2>You can create unlimited Agents</h2>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
