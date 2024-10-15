import { CreateGroup } from "@/components/CreateGroup";
import { Header } from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

// Import the GroupGrid as a client component
const GroupGrid = dynamic(
  () => import("@/components/GroupBox").then((mod) => mod.GroupGrid),
  {
    ssr: false,
  },
);

const Dashboard = async () => {
  const countOfGroups = 1;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="md:w-3/5 min-h-screen mx-auto">
      <Header image={session.user.image!} email={session.user.email!} />
      <div className="flex justify-end pt-6">
        <CreateGroup />
      </div>
      {
        // TODO: do something with countOfGroups ;)
        !countOfGroups ? (
          <EmptyDashboard />
        ) : (
          <GroupGrid groups={[...Array(countOfGroups)]} />
        )
      }
    </div>
  );
};

const EmptyDashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] py-2">
    <div className="opacity-20 hover:opacity-50 transition-opacity duration-300 ease-in-out">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p className="text-lg text-center mt-2">
        Click on Create Group to start.
      </p>
    </div>
  </div>
);

export default Dashboard;
