import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './ui/sidebar';

export const Sidebar = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
