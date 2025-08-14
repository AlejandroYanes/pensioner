'use client'

import type * as React from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  RockingChairIcon,
  WalletIcon,
  RailSymbolIcon,
  AwardIcon,
  UserRoundCheckIcon,
  BookOpenTextIcon,
} from 'lucide-react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/sidebar';

const links = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    name: 'Pension',
    url: '/pension',
    icon: RockingChairIcon,
  },
  {
    name: 'Retirement Planer',
    url: '/retirement-planner',
    icon: WalletIcon,
    new: true,
  },
  {
    name: 'Salary Sacrifice',
    url: '/salary-sacrifice',
    icon: RailSymbolIcon,
  },
  {
    name: 'Perks & Benefits',
    url: '/perks',
    icon: AwardIcon,
  },
  {
    name: 'Expert Help',
    url: '/help',
    icon: UserRoundCheckIcon,
  },
  {
    name: 'Learning Hub',
    url: '/hub',
    icon: BookOpenTextIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="text-3xl font-bold pl-9 pb-6">Mintago</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                    {item.new && <span className="ml-auto text-xs font-bold bg-lime-100 text-lime-700 px-2 py-1 rounded-md">New</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
