
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6 md:ml-20 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
