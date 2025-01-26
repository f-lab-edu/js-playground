import { Calendar, Home, Inbox, Search, Settings, Infinity, Dumbbell } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "repeat",
    url: "#",
    icon: Infinity,
    subItems: [
      { title: "Sub Home 1", url: "/sub-home-1" },
      { title: "Sub Home 2", url: "/sub-home-2" },
    ],
  },
  {
    title: "active",
    url: "#",
    icon: Dumbbell,
    subItems: [
      { title: "수집하기", url: "/sub-home-1" },
      { title: "앞으로가기", url: "/sub-home-2" },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Javascript Playground</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.subItems && item.subItems.length > 0}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>

                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <span className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 shrink-0" />
                          <span className="group-data-[state=collapsed]:hidden">
                            {item.title}
                          </span>
                        </span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.subItems && item.subItems.length > 0 && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
