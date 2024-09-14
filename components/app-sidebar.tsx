"use client";

import {
  Atom,
  Frame,
  History,
  LifeBuoy,
  Map,
  Newspaper,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Star,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
// import { StorageCard } from "@/components/storage-card";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
const data = {
  teams: [
    {
      name: "Find IPO result",
      logo: Atom,
      plan: "Enterprise",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "IPO",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        // {
        //   title: "History",
        //   url: "#",
        //   icon: History,
        //   description: "View your recent prompts",
        // },
        // {
        //   title: "Starred",
        //   url: "#",
        //   icon: Star,
        //   description: "Browse your starred prompts",
        // },
        // {
        //   title: "Settings",
        //   url: "#",
        //   icon: Settings2,
        //   description: "Configure your playground",
        // },
      ],
    },
    {
      title: "News",
      url: "dashboard/ipo-news",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "Mero Lagani",
          url: "#",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Share Sansar",
          url: "#",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Nepse Alpha",
          url: "#",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel className="text-white">Platform</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>
      </SidebarContent>
      {/* <StorageCard /> */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
