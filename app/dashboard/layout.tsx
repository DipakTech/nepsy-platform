import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { cookies } = await import("next/headers");
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md  p-2">
          <SidebarTrigger className="fixed" />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
};

export default DashboardLayout;
