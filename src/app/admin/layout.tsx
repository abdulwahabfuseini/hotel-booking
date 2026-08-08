import { AdminSidebar, AdminMobileNav } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen pb-20 lg:pb-8">{children}</main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
