import { Header } from "@/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="md:w-3/5 min-h-screen mx-auto">
      <Header image={session?.user?.image!} email={session?.user?.email!} />
      {children}
    </div>
  );
}
