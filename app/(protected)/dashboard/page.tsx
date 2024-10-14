import { CreateGroup } from "@/components/CreateGroup";
import { GradientFontTitle } from "@/components/gradient-font-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { redirect } from "next/navigation";

// Import the GroupGrid as a client component
const GroupGrid = dynamic(() => import('@/components/GroupBox').then(mod => mod.GroupGrid), {
  ssr: false
});

const Dashboard = async () => {
  const countOfGroups = 1;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }


  return (
    <div className="md:w-3/5 min-h-screen mx-auto">
      <Header image={session.user.image!} />
      <div className='flex justify-end pt-6'>
        <CreateGroup />
      </div>
      {
        // TODO: do something with countOfGroups ;)
        !countOfGroups ? <EmptyDashboard /> : <GroupGrid groups={[...Array(countOfGroups)]} />
      }
    </div>
  );
};

const Header = ({ image }: { image?: string }) => (
  <div className="flex justify-between pt-4 border-b">
    <div className="flex items-center cursor-pointer">
      <Image
        src="/logo.png"
        width={55}
        height={55}
        alt="Logo"
        className="rounded-full"
      />
      <span className="text-2xl font-bold ml-2">
        <GradientFontTitle text="Crypto Compass" />
      </span>
    </div>
    <Avatar className="h-14 w-14 cursor-pointer">
      <AvatarImage src={image} alt="@user-64bit" />
      <AvatarFallback>CC</AvatarFallback>
    </Avatar>
  </div>
);

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