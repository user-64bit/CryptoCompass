import { getGroupsAction } from "@/actions/getGroups";
import { Dashboard } from "@/components/DashBoard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const groups = await getGroupsAction({ email: session.user.email! });

  return <Dashboard groups={groups} />;
};
export default DashboardPage;
