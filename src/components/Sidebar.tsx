import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Outlet } from "react-router-dom";


export const Sidebar = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
};


