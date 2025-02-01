import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-64px-24px)]">
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
};
