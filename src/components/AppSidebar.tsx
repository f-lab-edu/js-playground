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
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  Dumbbell,
  Home,
  Inbox,
  Infinity,
  Settings
} from 'lucide-react';
import { IoIosCloseCircle } from 'react-icons/io';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
    subItems: [
      { title: 'Sub Home 1', url: '/sub-home-1' },
      { title: 'Sub Home 2', url: '/sub-home-2' },
    ],
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
    subItems: [
      { title: 'Sub Home 1', url: '/sub-home-1' },
      { title: 'Sub Home 2', url: '/sub-home-2' },
    ],
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
    subItems: [
      { title: 'Sub Home 1', url: '/sub-home-1' },
      { title: 'Sub Home 2', url: '/sub-home-2' },
    ],
  },
  {
    title: 'repeat',
    url: '#',
    icon: Infinity,
    subItems: [
      { title: 'Sub Home 1', url: '/sub-home-1' },
      { title: 'Sub Home 2', url: '/sub-home-2' },
    ],
  },
  {
    title: 'active',
    url: '#',
    icon: Dumbbell,
    subItems: [
      { title: '수집하기', url: '/sub-home-1' },
      { title: '앞으로가기', url: '/sub-home-2' },
    ],
  },
];

export function AppSidebar() {
  const { setOpen, open } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent className="bg-navy-950 text-white">
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <SidebarGroupLabel className="text-yellow-950 text-lg">
              code Menu
            </SidebarGroupLabel>
            <IoIosCloseCircle
              className="text-yellow-950 cursor-pointer"
              size={25}
              onClick={() => setOpen(false)}
            />
          </div>
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
  );
}
