import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useQuizStore } from '@/store/useQuiz';
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Inbox } from 'lucide-react';
import { FaPersonRifle, FaPersonWalkingArrowRight } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';

export function AppSidebar() {
  const { currentQuiz } = useQuizStore();
  const commands = currentQuiz?.commands ?? [];
  const { setOpen, open } = useSidebar();
  const alterSidebarCommands = (
    commands: {
      name: string;
      functionCode: string;
    }[]
  ) => {
    return commands.map((command) => {
      const icon =
        command.name === 'forward'
          ? FaPersonWalkingArrowRight
          : command.name === 'shoot'
            ? FaPersonRifle
            : Inbox;
      return {
        title: command.name,
        icon,
        command: command.functionCode,
      };
    });
  };
  const alteredSidebarCommand = alterSidebarCommands(commands);

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
              {alteredSidebarCommand.map((item) => (
                <Collapsible key={item.title} className="group/collapsible">
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
